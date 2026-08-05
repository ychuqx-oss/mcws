# Field Mapping

| Source field | Output field | Notes |
|---|---|---|
| `id` | `id` | Primary merge key. |
| `title` | `title` | English title or extracted title text. |
| `contextOnly` | included in `context` | Main source summary/timestamps/observations. |
| `sideNote` | appended to `context` | Appended as `Side note: ...` when present. |
| `date` | not normally written to `en-stories.json` | Timeline date lives in the timeline data files. Kept in restored JSON for traceability. |
| `platform` | not normally written | Kept in restored JSON/report for review. |
| `type` | not normally written | Timeline type lives in timeline data files. |
| `pov` | not normally written | Kept in restored JSON/report for review. |
| `directLink` | included only if already part of context/title | `en-stories.json` is a text overlay, not the canonical link source. |
| `sourcePage` | not written | Traceability back to extraction page. |

## Important app behavior

The app uses `en-stories.json` as an English overlay. Timeline records still come from the year timeline files; `en-stories.json` supplies English `title` and `context` by matching the same `id`.
