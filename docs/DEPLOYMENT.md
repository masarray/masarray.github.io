# Deployment

## Production target

- Repository: `masarray/masarray.github.io`
- Production URL: `https://masarray.github.io/`
- Source branch: `main`
- Source folder: repository root
- Hosting: GitHub Pages

Because this is the account-level Pages repository, the site is served from the domain root rather than a repository subpath.

## Required repository settings

In **Settings → Pages**:

```text
Source: Deploy from a branch
Branch: main
Folder: /(root)
```

The `.nojekyll` file prevents Jekyll processing and allows the static assets to be served as authored.

## Release procedure

1. Create a focused branch.
2. Run `python tools/validate-site.py` and `node --check app.js`.
3. Open a pull request and wait for the Quality Gate.
4. Review visible changes in a local static server.
5. Squash-merge the pull request into `main`.
6. Confirm the Pages deployment and critical URLs.
7. Check the homepage, catalog, 404 page, manifest, sitemap, robots file, and Google verification file.

## Post-deployment checks

```text
https://masarray.github.io/
https://masarray.github.io/404.html
https://masarray.github.io/site.webmanifest
https://masarray.github.io/sitemap.xml
https://masarray.github.io/robots.txt
https://masarray.github.io/googlec34c43149eef6100.html
```

Also confirm:

- GitHub API data loads or fallback data appears clearly;
- search, filters, sorting, and theme switching work;
- external links open safely;
- mobile layout has no horizontal overflow;
- social metadata still points to a valid public asset.

## Caching

GitHub Pages and browser caches can delay visible updates. Use a private window or hard refresh when checking a newly merged change. Avoid adding random query strings to permanent canonical or social URLs.

## Rollback

Revert the merge commit or merge a focused rollback pull request. Do not rewrite `main` history. Preserve the Google verification file unless search verification is intentionally replaced.
