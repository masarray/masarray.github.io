# Security Policy

## Supported surface

Security reports for this repository should concern the public portal at `https://masarray.github.io/`, its static assets, repository automation, or a vulnerability introduced by portal code.

Security concerns in a linked MasArray product must be reported through that product repository's security policy. This portal does not own or replace the security process of every linked project.

## Reporting a vulnerability

Do not open a public issue for an undisclosed vulnerability.

Use GitHub Private Vulnerability Reporting:

`https://github.com/masarray/masarray.github.io/security/advisories/new`

Include, when available:

- affected URL, file, or workflow;
- impact and realistic attack scenario;
- reproduction steps or proof of concept;
- browser, operating system, and relevant environment details;
- suggested remediation;
- whether the issue is already public.

## Response expectations

Reports are handled on a best-effort basis. Receipt, severity, scope, and remediation timing depend on reproducibility and impact. Please allow a reasonable period for investigation before public disclosure.

## Security design notes

- The site is static and requires no application server or database.
- The public GitHub API is used only to read repository metadata.
- No account, login, payment, analytics, or user-tracking SDK is part of this portal.
- External links opened in a new tab must use `rel="noopener"`.
- GitHub Actions workflows should use minimum permissions and official or carefully reviewed actions.
- Secrets, credentials, private product artifacts, and customer data must never be committed.

A machine-readable disclosure pointer is published at `/.well-known/security.txt`.
