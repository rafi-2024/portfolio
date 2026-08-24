# Payroll Import

## Purpose

Build and review reliable imports for employees, attendance, allowances, deductions, salary data, and parser-generated JSONL data.

## When To Use

Use for upload endpoints, management commands, parser output ingestion, precheck flows, batch imports, duplicate detection, error reports, and import Celery tasks.

## Workflow

1. Review existing import views, bulk import services, management commands, parser schemas, tasks, and tests.
2. Define file format, schema version, required columns, duplicate keys, and row-level validation.
3. Stream input files or JSONL where possible instead of loading full files into memory.
4. Pre-validate rows and collect row-level errors before saving.
5. Persist in chunks with batch inserts or updates.
6. Record import job status, counts, errors, source hashes, and audit metadata.
7. Add vertical slice tests for valid import, invalid rows, duplicates, permissions, chunking, idempotency, and database results.

## Rules

- Validate before save.
- Use chunk processing for large files.
- Use batch inserts or bulk updates when safe.
- Detect duplicate files and duplicate business rows.
- Produce actionable error reports with row numbers and field names.
- Never allow imports to overwrite finalized payroll without an approved correction workflow.
- Keep imports idempotent across retries and worker restarts.

## Output Requirements

Provide accepted format, validation rules, chunking strategy, duplicate policy, error report contract, job status behavior, tests, and verification commands.

## Validation Checklist

- Large files are streamed or chunked.
- Invalid rows do not create partial hidden corruption.
- Duplicate detection is tested.
- Import status and error reporting are persisted.
- Database effects are verified after import.
