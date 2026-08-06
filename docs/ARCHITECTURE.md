# Architecture

## Design goals

The portal is designed to remain fast, inspectable, inexpensive to host, and easy to maintain. It avoids a runtime framework and server dependency because its main job is public product discovery rather than transactional application behavior.

## Runtime flow

```text
GitHub Pages
    │
    ├── index.html        semantic page, navigation, product template, SEO
    ├── styles.css        design tokens, layout, themes, responsive behavior
    ├── app.js            repository retrieval, normalization, catalog UX
    └── static metadata   manifest, sitemap, robots, favicon, social preview
                              │
                              ▼
                  GitHub public repositories API
                              │
                 success ─────┴───── failure/rate limit
                    │                    │
                    ▼                    ▼
             normalized catalog     reviewed fallback catalog
```

## Data model

The browser retrieves public repositories for the `masarray` account. The catalog layer then:

1. removes forks, archived projects, empty repositories, and the portal repository;
2. normalizes name, description, language, topics, dates, website, release, and source URLs;
3. applies curated product metadata where public repository metadata is not sufficient;
4. classifies projects into audio, engineering, apps, or web/documentation groups;
5. ranks featured and mature products above lower-priority experiments;
6. renders a searchable, sortable list.

The fallback catalog is intentionally small and reviewed. It keeps important product paths available when GitHub's API is unavailable.

## Trust boundaries

- GitHub repository metadata is external, public input and must be treated as untrusted text before rendering.
- Dynamic text should be assigned through DOM text properties rather than injected as HTML.
- Repository URLs must remain within expected GitHub or declared HTTPS product locations.
- The portal does not execute code from product repositories.
- The portal does not claim that repository metadata proves product maturity, certification, safety, or compatibility.

## Availability

The static shell remains available independently of the API. Search and filters operate on whichever catalog source successfully loads. A GitHub API failure must not make the whole website blank.

## Privacy

The portal has no account system, analytics SDK, advertising SDK, payment SDK, or intentional collection of user content. Browser storage is limited to presentation preferences such as theme when implemented by the frontend.

## Change strategy

Prefer small, reversible changes. New dependencies require a documented benefit, maintenance owner, security review, and a clear reason the existing static architecture cannot meet the requirement.
