# Django API

## Purpose

Build and review Django, Django REST Framework, PostgreSQL, and service-layer backend changes for the payroll ERP.

## When To Use

Use for models, migrations, serializers, permissions, views, URLs, querysets, service functions, admin behavior, and API response contracts.

## Workflow

1. Inspect existing models, serializers, permissions, services, views, URLs, and tests in the affected app.
2. Define the API contract, permissions, validation rules, and database changes.
3. Put business logic in services and keep views thin.
4. Wrap multi-row or payroll-sensitive mutations in `transaction.atomic()`.
5. Add migrations for schema changes and indexes for new lookup patterns.
6. Add vertical slice tests through the public API or management command boundary.
7. Verify with focused pytest commands.

## Rules

- Use type hints for new services and non-trivial helpers.
- Do not put payroll calculations, import behavior, or authorization decisions in views.
- Use DRF serializers for request and response validation.
- Use explicit permissions for every protected endpoint.
- Use `select_related`, `prefetch_related`, annotations, or service-level batching to avoid N+1 queries.
- Raise explicit validation or domain exceptions and convert them to stable API responses.
- Never mutate finalized payroll unless the Payroll Processing skill confirms an approved reversal workflow.

## Output Requirements

Provide changed API contracts, service behavior, migrations, permission changes, tests, and verification commands.

## Validation Checklist

- Views are thin and delegate business behavior.
- Mutations are transactional.
- Inputs and outputs are validated.
- Permissions are tested.
- Query shape is reviewed for N+1 risks.
- Migrations are deterministic and reversible where practical.
