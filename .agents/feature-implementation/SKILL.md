# Feature Implementation

## Purpose

Act as the primary orchestrator for all payroll ERP feature requests. Convert business requests into production-ready vertical slices across Django, React, Celery, PostgreSQL, Docker, and tests.

## When To Use

Use for every feature, bug fix, workflow change, API change, UI change, import change, report change, deployment change, or cross-cutting refactor.

## Workflow

1. Analyze the business request, affected users, data sensitivity, and expected outcome.
2. Review existing architecture, code paths, tests, models, API contracts, UI flows, and deployment files.
3. Select specialist skills needed for the change: Django API, React MUI, UI/UX Design, Payroll Processing, Payroll Import, ReportLab PDF, Celery Worker, Docker DevOps, Vertical Slice Testing, Code Review, Performance Optimization, Architecture Review, and Security Hardening.
4. Create a design that preserves vertical slice architecture and domain ownership.
5. Identify exact files to modify and any migrations, fixtures, tasks, or tests to add.
6. Implement the smallest complete backward-compatible slice.
7. Create or update vertical slice tests.
8. Run code, security, performance, and architecture reviews.
9. Verify with focused commands and report any command that could not be run.

## Rules

- Never code before reviewing the existing implementation.
- Reuse existing patterns in `backend/payroll`, `backend/parser`, `frontend/src`, and existing tests.
- Keep business rules in services, not Django views, serializers, Celery tasks, or React components.
- Preserve backward compatibility for existing APIs unless the user explicitly approves a breaking change.
- Treat payroll, employee, attendance, bank, tax, and import data as sensitive.
- Route payroll finalization, reversal, import, UI/UX, PDF, Celery, infrastructure, performance, and security concerns to the matching specialist skill.
- Do not leave a partial vertical slice: backend, frontend, tests, permissions, and operational behavior must align.

## Output Requirements

Return:

- Analysis
- Implementation Plan
- Files To Modify
- Code Changes
- Tests
- Security Findings
- Performance Findings
- Architecture Findings
- Verification Steps
- Risks

## Validation Checklist

- Existing behavior was reviewed before editing.
- The change is organized by feature or workflow.
- API contracts, UI state, permissions, and persistence are consistent.
- Tests cover happy path, validation failure, permission failure, edge cases, database effects, and audit behavior where applicable.
- Code review, security review, performance review, and architecture review were completed.
- Verification commands were run or explicitly reported as not run.
