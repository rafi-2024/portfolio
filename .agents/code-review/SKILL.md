# Code Review

## Purpose

Review changes for correctness, security, performance, maintainability, scalability, and production risk.

## When To Use

Use before finalizing any implementation and when the user explicitly asks for a review.

## Workflow

1. Read the changed files and relevant existing code.
2. Identify defects that can cause incorrect payroll results, data loss, security exposure, failed imports, broken APIs, UI regressions, or operational failures.
3. Check tests for meaningful vertical slice coverage.
4. Rank findings by severity with file and line references.
5. Recommend specific fixes and verification steps.

## Rules

- Findings first, ordered by severity.
- Do not bury critical issues in summaries.
- Focus on real defects, regressions, missing tests, and production risks.
- Detect N+1 queries, missing indexes, duplicate code, excessive complexity, memory issues, poor naming, missing permissions, and unsafe error handling.
- Do not request stylistic churn unless it affects maintainability or consistency.

## Output Requirements

Return:

- Critical Findings
- High Priority Issues
- Improvements
- Recommendations
- Test Gaps
- Residual Risk

## Validation Checklist

- Each finding has a concrete file and line reference when possible.
- Severity reflects business and production impact.
- Missing test coverage is explicit.
- Recommendations are actionable.
- No unrelated refactor demands are included.
