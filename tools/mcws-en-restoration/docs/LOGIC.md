# Full Logic

## Goal

Restore the English text fields for the MCWS timeline by bringing back two source-table columns:

1. `Context (summary, timestamps, observations)`
2. `Side Note (info that exists outside 'Context')`

The output target is `src/data/timeline/en-stories.json`, because the app imports that file and maps entries by `id` when generating English title/context text.

## Data flow

```text
Uploaded PDFs
  ↓ table/text extraction
mcws_en_stories_restored_context_side_notes.json
  ↓ flatten rows
flat English story entries [{ id, title, context }]
  ↓ split to safe batches
batches/en-stories-batch-XX.json
  ↓ merge by id into existing repo en-stories.json
src/data/timeline/en-stories.json
  ↓ validate
report counts, duplicate ids, missing fields, protected manual entries
```

## Merge rules

1. `id` is the primary key.
2. Existing entries are loaded first from `src/data/timeline/en-stories.json`.
3. Batch entries are merged in ascending filename order.
4. If an incoming entry has the same `id`, only populated fields in the incoming entry replace existing fields.
5. Empty strings, `null`, and `undefined` do not erase existing values.
6. Manual entries outside the PDF extraction range, especially 2024/2026 hand-written records, are preserved because there is no matching incoming `id` for them.
7. The final output is sorted by numeric `s###` id.
8. JSON is written with two-space indentation and a trailing newline.

## Context construction rules

For each extracted row:

1. `contextOnly` is the source Context column.
2. `sideNote` is the source Side Note column.
3. `context` is built as:
   - `contextOnly` only, when there is no side note.
   - `contextOnly + "\n\nSide note: " + sideNote`, when a side note exists.
   - `Side note: sideNote`, if context is empty but side note exists.
4. `title` is taken from the extracted title column when available.
5. The scripts do not invent missing facts. If a source URL is truncated in the extracted source, it remains truncated.

## Validation rules

The validation script checks:

- JSON parse success.
- Top-level output is an array.
- Every entry has an `id`.
- Duplicate ids are reported.
- Entries missing both `title` and `context` are reported.
- Optional protected ids can be checked to confirm they still exist after merge.

## Why batching exists

The restored JSON is large. Batching makes GitHub/UI review easier and reduces the risk of accidentally overwriting hand-written data. The final `en-stories.json` is still provided for one-step application.
