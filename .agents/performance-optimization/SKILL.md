# Performance Optimization

## Purpose

Improve and review backend, database, Celery, import, PDF, and frontend performance without compromising payroll correctness.

## When To Use

Use for slow APIs, large imports, payroll analytics, reports, DataGrid rendering, dashboards, background jobs, query tuning, bulk operations, and bundle concerns.

## Workflow

1. Define the measured performance problem and target behavior.
2. Inspect current query patterns, indexes, task behavior, payload sizes, frontend render paths, and tests.
3. Measure before changing when practical.
4. Optimize the narrowest bottleneck.
5. Measure after changing with the same scenario.
6. Add regression tests or query-count checks for high-risk paths.

## Rules

- Measure before optimization and measure after optimization.
- Prefer database indexes, query shaping, pagination, streaming, chunking, and bulk operations over caching first.
- Use `select_related`, `prefetch_related`, annotations, and aggregation carefully.
- Avoid loading full import files, PDF datasets, or payroll periods into memory when chunking is possible.
- Keep DataGrid columns, derived rows, and handlers stable to reduce re-renders.
- Do not trade correctness, authorization, or auditability for speed.

## Output Requirements

Provide baseline, bottleneck, change made, after-measurement, tradeoffs, tests, and verification commands.

## Validation Checklist

- Baseline and after results are recorded or the missing measurement is explained.
- Query count and indexes were reviewed for backend changes.
- Memory behavior was reviewed for imports and PDFs.
- Frontend render and bundle impact were reviewed for UI changes.
- Optimization does not bypass validation or permissions.
