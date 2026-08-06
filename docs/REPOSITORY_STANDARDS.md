# Repository Standards

## Branch and pull-request policy

- `main` is the production source of truth.
- Changes should arrive through short-lived, focused branches.
- Pull requests must explain the problem, solution, evidence, and user impact.
- Material UI changes should include screenshots.
- Quality checks must pass before merge.
- Squash merge is preferred to keep production history readable.

## Content quality

Portal copy must be:

- attributable to a public repository or published product page;
- clear about maturity, platform, licensing, and safety boundaries;
- free of unsupported superlatives, certification claims, or universal compatibility claims;
- understandable to public users without hiding important limitations;
- consistent in product naming and capitalization.

## Catalog eligibility

A repository is normally eligible when it is public, non-fork, non-archived, non-empty, and useful to a public visitor. Internal source mirrors, experiments without a public story, duplicate distribution surfaces, and repositories without usable documentation may be suppressed or deprioritized.

## Repository metadata expected from product owners

Each public product repository should maintain, where applicable:

- a concise GitHub description;
- a product website or documentation URL;
- relevant GitHub topics;
- a clear README and maturity statement;
- release assets and checksums when binaries are distributed;
- license or end-user terms;
- security and support guidance;
- screenshots or product preview assets;
- current platform and dependency requirements.

The portal should not compensate permanently for missing product metadata. Curated overrides are for presentation quality and migration, not a substitute for maintaining the source repository.

## Security and privacy

- Never commit secrets, credentials, signing material, customer data, or private product artifacts.
- Use minimum GitHub Actions permissions.
- Keep external scripts and remote runtime dependencies out of the portal unless explicitly reviewed.
- Treat GitHub API strings as untrusted input.
- Keep private vulnerability reports out of public issues.

## Performance and accessibility

- Preserve semantic HTML and keyboard navigation.
- Maintain visible focus states and reduced-motion behavior.
- Avoid large JavaScript frameworks for features that can be implemented clearly in the current architecture.
- Optimize images and avoid blocking third-party assets.
- Test narrow mobile layouts and common desktop widths.
