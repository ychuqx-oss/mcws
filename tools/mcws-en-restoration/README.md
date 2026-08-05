# MCWS English Context / Side Note Logic

This directory contains the reproducible logic for restoring `Context (summary, timestamps, observations)` and `Side Note (info that exists outside 'Context')` into the English story overlay.

The scripts and documentation were copied from `mcws_all_logic_package(2).zip` without executing any Python, Node.js, or shell logic locally.

## Contents

- `scripts/00-extract-pdf-text.py` — conservative PDF text extraction helper.
- `scripts/01-flatten-restored-json.mjs` — converts structured restored rows into English story entries.
- `scripts/02-split-batches.mjs` — splits the entries into reviewable batches.
- `scripts/03-merge-en-stories-restored.mjs` — merges populated fields by story ID.
- `scripts/04-validate-en-stories.mjs` — validates IDs, text fields, and protected manual entries.
- `scripts/05-full-rebuild.mjs` — orchestrates the complete rebuild.
- `scripts/apply-final-file.sh` — copies a prepared final file into the repository.
- `docs/LOGIC.md` — complete data flow and merge rules.
- `docs/FIELD_MAPPING.md` — source-to-output field mapping.
- `docs/VALIDATION_REPORT.md` — validation counts from the supplied package.

No script is run automatically by importing or building the application.
