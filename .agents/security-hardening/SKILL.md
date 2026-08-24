# Security Hardening

## Purpose

Perform full-stack security review and hardening for the payroll ERP across application, API, database, containers, Linux VPS, Nginx, Celery, network, and secrets management.

## When To Use

Use for every security-sensitive change, authentication or authorization update, deployment change, Docker/Nginx change, import/upload feature, report export, payroll mutation, user administration feature, and production readiness review.

## Workflow

1. Identify sensitive assets: employee records, salary, tax, bank, attendance, payroll reports, imports, credentials, tokens, logs, and backups.
2. Review Django settings, DRF permissions, authentication, authorization, CSRF, CORS, cookies, file uploads, SQL usage, error handling, and audit behavior.
3. Review React for XSS, token handling, sensitive data exposure, route protection, error messages, and CSP compatibility.
4. Review PostgreSQL roles, permissions, exposed ports, backups, migrations, and least privilege.
5. Review Docker and Compose for non-root users, privileged mode, Docker socket exposure, image provenance, resource limits, volumes, and read-only mounts where practical.
6. Review Linux VPS posture: SSH hardening, root login disabled, key-based authentication, Fail2Ban, UFW firewall, closed unused ports, patching, audit logging, and log monitoring.
7. Review Nginx TLS, HSTS, security headers, rate limits, request/body limits, proxy headers, and static/media exposure.
8. Review Celery broker protection, task authorization boundaries, idempotency, rate abuse, queue isolation, and log leakage.
9. Review network security and secrets management, including environment variables, secret rotation, credential exposure, and backup protection.
10. Score production readiness and provide prioritized remediation.

## Rules

- Never recommend disabling security controls to simplify development.
- Never store secrets in code, committed `.env` files, images, frontend bundles, logs, tests, or documentation examples.
- Every payroll, import, report, user, and admin endpoint must enforce authentication and authorization.
- Validate input at API, serializer, service, import, upload, and frontend form boundaries.
- Protect file uploads against unsafe names, oversized files, unexpected types, parser abuse, and stored sensitive data exposure.
- Use least privilege for database users, containers, host users, network exposure, and admin tooling.
- Treat debug output, stack traces, generated PDFs, parser outputs, and import error files as sensitive.

## Output Requirements

Return:

- Critical Findings
- High Risk Findings
- Medium Risk Findings
- Low Risk Findings
- Remediation Steps
- Hardening Checklist
- Security Score
- Production Readiness Score

## Validation Checklist

- Django, React, PostgreSQL, Docker, Linux VPS, Nginx, Celery, network security, and secrets management were all reviewed.
- OWASP Top 10 risks were considered.
- Authentication and authorization were checked for every affected workflow.
- Sensitive data exposure in logs, exports, uploads, and frontend storage was reviewed.
- Remediation steps are prioritized and verifiable.
