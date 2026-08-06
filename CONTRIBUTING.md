# Contributing

Thank you for helping improve the MasArray Software Portal.

## Scope

This repository accepts changes to the portal website, public product metadata, accessibility, performance, documentation, validation, and repository automation. Product bugs and feature requests belong in the relevant product repository rather than here.

## Before opening a pull request

1. Search existing issues and pull requests.
2. Keep the change focused on one problem.
3. Do not include customer files, private captures, credentials, license keys, activation data, personal information, employer-confidential material, or proprietary product assets.
4. Preserve the portal's static, dependency-light architecture unless a clear technical need is documented.
5. Keep product claims attributable to the linked repository and avoid unsupported certification, compatibility, safety, or performance claims.

## Local checks

```bash
python tools/validate-site.py
node --check app.js
python -m http.server 4173
```

Review the site at desktop and narrow mobile widths. Check both dark and light themes, keyboard navigation, search, filters, sorting, release links, and the API fallback state.

## Pull-request expectations

A good pull request includes:

- a clear problem statement;
- a concise explanation of the solution;
- screenshots for visible UI changes;
- test evidence and affected browsers when relevant;
- no unrelated formatting or generated-file churn;
- an updated changelog for material public changes.

Use conventional, readable commit messages such as:

```text
fix: preserve catalog fallback when GitHub API is unavailable
feat: add product maturity filter
chore: strengthen repository quality checks
```

## Product-directory rules

A repository should be discoverable only when it is public, non-archived, non-fork, and useful to a public visitor. Curated names, descriptions, categories, and priority rules must match the authoritative product repository. Experimental or incomplete repositories should not be presented as stable products.

See [`docs/REPOSITORY_STANDARDS.md`](docs/REPOSITORY_STANDARDS.md) for detailed governance.

## Review and merge

Changes are reviewed for factual accuracy, user value, accessibility, performance, security, and maintenance cost. Passing CI is necessary but does not replace content or engineering review.

By contributing, you confirm that you have the right to submit the material and that it does not expose confidential or restricted information.
