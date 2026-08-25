---
name: render-ci-cd
description: "Use when configuring, reviewing, or troubleshooting a CI/CD pipeline that deploys a Dockerized Next.js application to Render, especially GitHub Actions on main, Render Blueprints, free-tier limits, health checks, Prisma migrations, or deploy failures."
---

# Render CI/CD

Use this workflow for this repository's Render deployment. Keep CI and CD separate:
GitHub Actions proves that a commit is buildable, while Render deploys the linked
branch after the required checks pass.

## Repository contract

- The deploy branch is `main`.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, and `npm run build`.
- `render.yaml` defines a Docker web service and a Render Postgres database.
- Render uses `autoDeployTrigger: checksPass`, so the Render service must be linked
to the same GitHub repository and branch. Do not add Render API keys to GitHub for
this native auto-deploy path.
- The service health check is `/api/health`.

## Free-tier setup

1. Create or sync the Blueprint from the Render Dashboard using `render.yaml`.
2. Select the Free instance for the web service and the Free instance for Postgres.
3. Enter `N8N_WEBHOOK_URL` in the Dashboard when prompted. Never commit its value.
4. Confirm that `DATABASE_URL` is connected from the Blueprint database reference.
5. Confirm the service's linked branch is `main` and auto-deploy is set to
   **After CI Checks Pass**.
6. Push a small change to `main`, then inspect GitHub Actions, Render Events, and
   the public `/api/health` endpoint in that order.

## Migration behavior

Render's free web services do not support `preDeployCommand`. This repository runs
`prisma migrate deploy` in the production container's startup command before
`server.js`. A failed migration prevents the new container from becoming healthy.
Migrations must be backwards-compatible because the application can be serving
while a new instance is starting.

Do not use `prisma db push` in CI or production. Add committed Prisma migrations
locally and deploy them with `prisma migrate deploy`.

## Free-tier constraints

- A Free web service sleeps after 15 minutes without inbound traffic and can take
  about a minute to wake up.
- Free web services have ephemeral filesystems and cannot use persistent disks.
  Store durable data in Postgres or another external service.
- Free web services receive 750 instance hours per workspace per calendar month.
- Free Postgres is limited to 1 GB, has no backups or connection pooling, and
  expires 30 days after creation. It is suitable for evaluation, not production.
- Free Postgres is limited to one active database per workspace.
- Monitor Render's Billing page and plan a database upgrade or export before the
  30-day expiry.

## Troubleshooting order

1. If no Render deploy starts, verify the commit is on `main`, the GitHub checks
   exist, and all checks concluded successfully. Render does not deploy when no
   checks are detected or one fails.
2. If CI fails, reproduce with `npm ci`, `npm run lint`, and `npm run build`.
3. If the container fails to start, inspect migration logs and verify the Render
   Postgres connection string is present.
4. If health checks fail, request `/api/health` and verify the process listens on
   Render's `PORT` through the Docker image's `server.js` command.
5. If the app is slow only after inactivity, account for Free instance spin-down.
6. If contact submission succeeds but email does not, verify the Dashboard value
   of `N8N_WEBHOOK_URL` and the n8n workflow independently of deployment.

## Authoritative references

- Blueprint specification: https://render.com/docs/blueprint-spec
- Deploys and CI checks: https://render.com/docs/deploys
- Free instances: https://render.com/docs/free
