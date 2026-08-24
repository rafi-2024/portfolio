# Vertical Slice Testing

## Purpose

Test complete payroll business workflows through public boundaries rather than isolated implementation details.

## When To Use

Use for all feature work, bug fixes, payroll processing changes, imports, permissions, reports, API changes, React workflows, Celery tasks, and deployment-sensitive behavior.

## Workflow

1. Identify the user action or business workflow under test.
2. Choose the public boundary: API endpoint, management command, Celery task, React page, or end-to-end browser flow.
3. Build realistic data through factories, fixtures, or existing setup helpers.
4. Execute the workflow with real database access.
5. Assert response, database state, permissions, audit trail, emitted job status, and user-visible UI state.
6. Mock only external APIs, email, SMS, and third-party services.
7. Keep tests named after the business behavior.

## Rules

- Do not organize new tests primarily by models, services, repositories, validators, or serializers.
- Organize tests by feature, user action, and business workflow.
- Cover happy path, validation failures, permission failures, edge cases, database verification, and audit trail verification.
- Use pytest, pytest-django, and factory-boy style setup for backend tests.
- Use Vitest, Testing Library, MSW, and Playwright for frontend and browser workflows.
- Avoid asserting private helper calls when public behavior can be asserted.

## Output Requirements

Provide workflow names, test files, covered scenarios, mocked boundaries, database assertions, audit assertions, and commands run.

## Validation Checklist

- Tests fail for the original bug or missing behavior.
- Tests cover permissions and validation.
- Database state is asserted.
- Audit or job status is asserted where relevant.
- External systems are mocked and internal database behavior is real.
