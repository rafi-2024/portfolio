# Celery Worker

## Purpose

Build and review reliable background jobs for payroll imports, parser processing, PDF generation, scheduled maintenance, and long-running workflows.

## When To Use

Use for Celery tasks, queues, retries, idempotency, worker configuration, progress reporting, Redis broker behavior, task logging, and scheduled jobs.

## Workflow

1. Review existing tasks, queue routing, Docker Compose worker services, job models, and tests.
2. Define task inputs, queue, timeout, retry policy, idempotency key, and progress model.
3. Keep tasks thin and delegate business behavior to services.
4. Persist task status, counts, errors, and completion metadata.
5. Make retries safe by using source hashes, unique constraints, locks, or idempotent service operations.
6. Log structured progress without leaking payroll data.
7. Add tests for routing, idempotency, retry-safe behavior, failure status, and database effects.

## Rules

- Tasks must be idempotent or explicitly protected from duplicate execution.
- Use bounded retries with backoff for transient failures only.
- Do not retry validation errors, permission errors, or deterministic data errors.
- Do not pass large payloads through the broker; pass IDs, paths, hashes, or compact parameters.
- Use separate queues for parser-heavy work and normal payroll jobs when load requires it.
- Record failures in a user-visible job model or audit trail.

## Output Requirements

Provide task contract, queue choice, retry policy, idempotency strategy, logging behavior, tests, and verification commands.

## Validation Checklist

- Duplicate task delivery is safe.
- Long tasks expose progress or status.
- Failures are persisted and actionable.
- Logs avoid sensitive payroll details.
- Queue routing and worker settings were reviewed.
