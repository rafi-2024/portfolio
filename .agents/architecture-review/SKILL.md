# Architecture Review

## Purpose

Review module boundaries, coupling, cohesion, domain ownership, scalability, and long-term maintainability.

## When To Use

Use for new features, refactors, cross-module changes, service extraction, API redesigns, imports, payroll processing, background jobs, and frontend architecture changes.

## Workflow

1. Map the affected domains, modules, services, API endpoints, frontend pages, tasks, and data ownership.
2. Identify dependencies and direction of calls.
3. Check whether the change preserves vertical slice architecture and domain separation.
4. Detect circular dependencies, misplaced business logic, duplicated rules, and excessive coupling.
5. Recommend the smallest refactor that improves ownership without broad churn.

## Rules

- Business rules belong in domain services.
- Views, tasks, and React pages orchestrate; they do not own payroll rules.
- Shared utilities must not become dumping grounds for domain behavior.
- Avoid cross-app imports that create circular dependencies or unclear ownership.
- Keep parser, import, payroll calculation, reporting, administration, and authentication responsibilities distinct.
- Prefer incremental refactoring attached to the feature being changed.

## Output Requirements

Provide boundary map, coupling concerns, architectural debt, refactoring opportunities, scalability concerns, and recommended next steps.

## Validation Checklist

- Domain ownership is clear.
- Dependencies flow in a maintainable direction.
- No circular dependencies were introduced.
- Business logic is not duplicated across API, task, and UI layers.
- Refactoring recommendations are scoped and actionable.
