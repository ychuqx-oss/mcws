# MCWS English restoration package review

Reviewed on 2026-08-04.

## Packages

- `mcws_all_logic_package(1).zip`
- `mcws_en_stories_batched_merge_package(1).zip`

## Comparison

- Both packages contain the same five English story batch files.
- Batch sizes are 150, 150, 150, 150, and 120 entries.
- The complete package contains 720 final entries.
- `data/output/en-stories.final.json` and `src/data/timeline/en-stories.json` are byte-identical.
- Final file SHA-256: `f48209861c7f00a51331469e7083ea24ea07fc850a62308fe5f505c5c8aefd0d`.
- The two merge scripts are not byte-identical: the complete package version supports explicit CLI paths and belongs to the reproducible rebuild workflow; the batched package version is a simpler repo-root helper.

## Validation

The complete package validation completed successfully:

- JSON parse: passed
- Entries: 720
- Missing IDs: 0
- Duplicate IDs: 0
- Entries missing both title and context: 0
- Protected manual IDs present: 48/48

## Intended target

The validated replacement target is:

`src/data/timeline/en-stories.json`

The source package also includes extraction inputs, field mapping, rebuild logic, batch generation, merge logic, and validation scripts.
