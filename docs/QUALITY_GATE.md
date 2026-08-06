# Quality Gate

The portal quality gate is intentionally dependency-free and designed to fail early on changes that would weaken the public website.

## Automated checks

The workflow at `.github/workflows/quality.yml` runs on pull requests, pushes to `main`, and manual dispatches. It uses read-only repository permissions and performs:

1. `python tools/validate-site.py`
2. `node --check app.js`
3. a local HTTP server smoke test for the homepage and critical static assets

## Validator coverage

`tools/validate-site.py` checks:

- required production files;
- one valid page title and expected language declaration;
- description, viewport, Open Graph, Twitter, canonical, icon, manifest, and stylesheet metadata;
- duplicate HTML IDs;
- missing local `href` and `src` assets;
- `rel="noopener"` on links opened with `target="_blank"`;
- parseable web manifest, sitemap, and robots configuration;
- expected production canonical and sitemap URLs;
- suspicious credential patterns and forbidden sensitive filenames;
- unexpectedly large files and excessive total static footprint.

## Local use

```bash
python tools/validate-site.py
node --check app.js
python -m http.server 4173
```

The validator returns a non-zero exit code on errors. Warnings are printed without failing the build when they identify review items rather than broken production behavior.

## Maintenance rules

- Keep the validator compatible with the Python standard library.
- Add a focused regression check when fixing a class of repository or website defect.
- Avoid checks that depend on unstable external services during pull-request validation.
- Keep workflow permissions at the minimum required level.
- Treat a passing workflow as a baseline, not a substitute for visual, factual, accessibility, and engineering review.
