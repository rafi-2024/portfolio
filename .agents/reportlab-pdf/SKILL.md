# ReportLab PDF

## Purpose

Build and review payroll PDF generation for payslips, payroll summaries, tax reports, audit reports, and exports.

## When To Use

Use for ReportLab documents, payslip layouts, payroll report exports, PDF Celery tasks, fonts, page templates, headers, footers, and printable financial output.

## Workflow

1. Review existing report services, PDF tests, templates, export endpoints, and data sources.
2. Define document purpose, audience, page size, columns, totals, grouping, and confidentiality needs.
3. Use ReportLab Platypus flowables, reusable table styles, page templates, headers, footers, and page numbering.
4. Register Unicode-capable fonts when employee names, departments, or remarks require them.
5. Generate PDFs from service-layer DTOs or query results, not from views directly.
6. Add tests for generation success, key text, totals, page behavior, permissions, and empty data.

## Rules

- Use Platypus for structured reports.
- Keep reusable PDF components in report services or dedicated helpers.
- Include headers, footers, page numbering, report period, generated timestamp, and confidentiality marking when appropriate.
- Avoid exposing hidden data in metadata, filenames, logs, or public URLs.
- Do not perform expensive database queries inside drawing callbacks.
- Use Celery for long-running or large PDF jobs.

## Output Requirements

Provide report data contract, layout choices, permissions, file handling, tests, and verification commands.

## Validation Checklist

- PDF renders with real payroll data and empty data.
- Totals match backend calculations.
- Unicode text is supported where needed.
- Export permissions are enforced.
- Large reports are suitable for background generation.
