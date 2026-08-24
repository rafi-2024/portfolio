# Payroll Processing

## Purpose

Protect correctness, auditability, and immutability of payroll execution workflows.

## When To Use

Use for payroll runs, calculations, approvals, finalization, locking, unlocking, reversal, corrections, audit trails, salary records, tax handling, and month-based payroll workflows.

## Workflow

1. Identify the payroll period, employee scope, source records, deductions, allowances, taxes, and authorization rules.
2. Review existing payroll models, services, reports, tests, indexes, and finalization behavior.
3. Design idempotent processing that prevents duplicate runs.
4. Validate calculations before persistence.
5. Use transactions and row-level locking where concurrent updates are possible.
6. Record audit events for creation, finalization, reversal, and privileged changes.
7. Add vertical slice tests for calculation, locking, duplicate prevention, permission failures, and audit verification.

## Rules

- Never modify finalized payroll in place.
- Corrections to finalized payroll must use an explicit reversal, adjustment, or new-period workflow.
- Prevent duplicate payroll runs for the same employee, period, and payroll source.
- Use decimal-safe calculations for money.
- Validate gross pay, deductions, allowances, tax, net pay, and negative-value edge cases.
- Keep calculations in services and make them deterministic.
- Treat all payroll mutation endpoints and tasks as permission-sensitive.

## Output Requirements

Provide calculation rules, finalization behavior, duplicate-prevention strategy, audit behavior, tests, and verification commands.

## Validation Checklist

- Finalized payroll cannot be silently changed.
- Duplicate run protection is enforced in code and database constraints where practical.
- Calculations are deterministic and tested.
- Mutations are transactional.
- Audit trails are created and asserted in tests.
