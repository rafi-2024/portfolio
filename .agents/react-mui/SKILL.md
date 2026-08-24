# React MUI

## Purpose

Build and review React, Vite, Material UI, React Query, forms, pages, components, and frontend tests for the payroll ERP.

## When To Use

Use for pages, components, forms, DataGrid tables, dashboard views, route guards, API client behavior, loading states, error states, empty states, and responsive UI.

## Workflow

1. Inspect existing pages, components, services, tests, route guards, and Material UI patterns.
2. Define the user workflow, API calls, validation schema, and access behavior.
3. Implement functional components with hooks and existing service modules.
4. Use React Hook Form and Zod for new complex forms when available; otherwise follow the repository's existing form pattern and avoid adding dependencies without need.
5. Use MUI DataGrid for tabular payroll, employee, import, and report data.
6. Add loading, error, empty, disabled, permission, and success states.
7. Verify with Vitest, Testing Library, MSW, build, and Playwright when the workflow is end-to-end.

## Rules

- Functional components only.
- Hooks only for state, effects, routing, data fetching, and form behavior.
- Keep API access in `frontend/src/services` or existing client modules.
- Never expose tokens, secrets, stack traces, or sensitive payroll data in logs or UI errors.
- Make layouts responsive and dense enough for operational payroll work.
- Use accessible controls, labels, keyboard behavior, and clear error messages.
- Avoid unnecessary re-renders in DataGrid and dashboard pages by memoizing expensive derived data and stable column definitions.

## Output Requirements

Provide changed user flows, components, services, validation behavior, tests, screenshots when relevant, and verification commands.

## Validation Checklist

- Loading, error, empty, success, and permission states exist.
- Forms validate before submit and surface API errors.
- DataGrid columns are stable and usable with real payroll volumes.
- Sensitive data is not leaked in storage, logs, or messages.
- Vitest/build or focused frontend verification was run.
