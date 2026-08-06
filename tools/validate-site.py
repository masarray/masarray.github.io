#!/usr/bin/env python3
"""Dependency-free production checks for the MasArray static portal."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"

REQUIRED_FILES = (
    ".nojekyll",
    "404.html",
    "README.md",
    "app.js",
    "favicon.svg",
    "index.html",
    "robots.txt",
    "site.webmanifest",
    "sitemap.xml",
    "social-preview.svg",
    "styles.css",
)

TEXT_SUFFIXES = {".css", ".html", ".js", ".json", ".md", ".py", ".svg", ".txt", ".xml", ".yml", ".yaml"}
MAX_SINGLE_ASSET_BYTES = 1_500_000
MAX_TOTAL_SITE_BYTES = 6_000_000


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.references: list[tuple[str, str, int]] = []
        self.meta: dict[tuple[str, str], str] = {}
        self.links: list[dict[str, str]] = []
        self.html_lang = ""
        self.title_count = 0
        self._in_title = False
        self._line = 1

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): (value or "") for key, value in attrs}
        self._line = self.getpos()[0]

        if tag == "html":
            self.html_lang = values.get("lang", "")
        if tag == "title":
            self._in_title = True
            self.title_count += 1
        if identifier := values.get("id"):
            self.ids.append(identifier)
        if tag in {"a", "link"} and values.get("href"):
            self.references.append(("href", values["href"], self._line))
        if tag in {"img", "script", "source"} and values.get("src"):
            self.references.append(("src", values["src"], self._line))
        if tag == "meta":
            if name := values.get("name"):
                self.meta[("name", name.lower())] = values.get("content", "")
            if prop := values.get("property"):
                self.meta[("property", prop.lower())] = values.get("content", "")
        if tag == "link":
            self.links.append(values)
        if tag == "a" and values.get("target") == "_blank":
            rel_tokens = set(values.get("rel", "").lower().split())
            if "noopener" not in rel_tokens:
                self.references.append(("unsafe-blank", values.get("href", ""), self._line))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False


def local_path_from_reference(reference: str) -> Path | None:
    if not reference or reference.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if not path or path == "/" or path.startswith("/"):
        return None
    candidate = (ROOT / path).resolve()
    try:
        candidate.relative_to(ROOT.resolve())
    except ValueError:
        return Path("__outside_repository__")
    return candidate


def add_error(errors: list[str], message: str) -> None:
    errors.append(message)


def validate_required_files(errors: list[str]) -> None:
    for relative in REQUIRED_FILES:
        if not (ROOT / relative).is_file():
            add_error(errors, f"Missing required production file: {relative}")


def validate_html(errors: list[str], warnings: list[str]) -> None:
    content = INDEX.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(content)

    if parser.html_lang.lower() not in {"id", "id-id"}:
        add_error(errors, "index.html must declare lang=\"id\" or lang=\"id-ID\".")
    if parser.title_count != 1:
        add_error(errors, f"index.html must contain exactly one title element; found {parser.title_count}.")

    duplicates = sorted(key for key, count in Counter(parser.ids).items() if count > 1)
    if duplicates:
        add_error(errors, f"Duplicate HTML IDs: {', '.join(duplicates)}")

    required_meta = (
        ("name", "description"),
        ("name", "viewport"),
        ("name", "twitter:card"),
        ("property", "og:title"),
        ("property", "og:description"),
        ("property", "og:image"),
        ("property", "og:url"),
    )
    for key in required_meta:
        if not parser.meta.get(key, "").strip():
            add_error(errors, f"Missing or empty metadata: {key[0]}={key[1]}")

    required_link_rel = {"canonical", "icon", "manifest", "stylesheet"}
    present_rel: set[str] = set()
    for link in parser.links:
        present_rel.update(link.get("rel", "").lower().split())
    missing_rel = sorted(required_link_rel - present_rel)
    if missing_rel:
        add_error(errors, f"Missing link relation(s): {', '.join(missing_rel)}")

    canonical = next((item.get("href", "") for item in parser.links if "canonical" in item.get("rel", "").lower().split()), "")
    if canonical != "https://masarray.github.io/":
        add_error(errors, f"Unexpected canonical URL: {canonical or '<missing>'}")

    for kind, reference, line in parser.references:
        if kind == "unsafe-blank":
            add_error(errors, f"target=_blank link lacks rel=noopener at line {line}: {reference}")
            continue
        local = local_path_from_reference(reference)
        if local is not None and not local.is_file():
            add_error(errors, f"Broken local {kind} at line {line}: {reference}")

    if "application/ld+json" not in content:
        warnings.append("No JSON-LD structured data marker was found.")
    if "<noscript>" not in content:
        warnings.append("No noscript fallback was found.")


def validate_manifest(errors: list[str]) -> None:
    path = ROOT / "site.webmanifest"
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        add_error(errors, f"Invalid site.webmanifest: {exc}")
        return

    for key in ("name", "short_name", "start_url", "display", "icons"):
        if not manifest.get(key):
            add_error(errors, f"site.webmanifest is missing {key!r}.")
    for icon in manifest.get("icons", []):
        src = icon.get("src", "")
        local = local_path_from_reference(src)
        if local is not None and not local.is_file():
            add_error(errors, f"Manifest icon does not exist: {src}")


def validate_robots_and_sitemap(errors: list[str]) -> None:
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap: https://masarray.github.io/sitemap.xml" not in robots:
        add_error(errors, "robots.txt must reference the production sitemap URL.")

    try:
        tree = ET.parse(ROOT / "sitemap.xml")
    except (OSError, ET.ParseError) as exc:
        add_error(errors, f"Invalid sitemap.xml: {exc}")
        return

    locations = [element.text or "" for element in tree.iter() if element.tag.endswith("loc")]
    if "https://masarray.github.io/" not in locations:
        add_error(errors, "sitemap.xml must include the production homepage.")


def validate_repository_hygiene(errors: list[str], warnings: list[str]) -> None:
    total_bytes = 0
    forbidden_names = {".env", "id_rsa", "id_ed25519"}
    secret_pattern = re.compile(r"(?:ghp_|github_pat_|AKIA)[A-Za-z0-9_\-]{16,}")

    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        relative = path.relative_to(ROOT)
        size = path.stat().st_size
        total_bytes += size

        if path.name in forbidden_names:
            add_error(errors, f"Forbidden sensitive file committed: {relative}")
        if size > MAX_SINGLE_ASSET_BYTES:
            add_error(errors, f"Asset exceeds {MAX_SINGLE_ASSET_BYTES} bytes: {relative} ({size} bytes)")
        if path.suffix.lower() in TEXT_SUFFIXES and size <= 1_000_000:
            text = path.read_text(encoding="utf-8")
            if secret_pattern.search(text):
                add_error(errors, f"Potential credential pattern found in: {relative}")
            if "\r\n" in text:
                warnings.append(f"CRLF line endings found in: {relative}")

    if total_bytes > MAX_TOTAL_SITE_BYTES:
        add_error(errors, f"Repository production footprint exceeds {MAX_TOTAL_SITE_BYTES} bytes: {total_bytes}")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    validate_required_files(errors)
    if INDEX.is_file():
        validate_html(errors, warnings)
    validate_manifest(errors)
    validate_robots_and_sitemap(errors)
    validate_repository_hygiene(errors, warnings)

    for warning in warnings:
        print(f"WARNING: {warning}")

    if errors:
        print("\nSite validation failed:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    print(f"Site validation passed with {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
