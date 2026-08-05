#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

function run(cmd, args) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('node', ['scripts/01-flatten-restored-json.mjs', '--input', 'data/input/mcws_en_stories_restored_context_side_notes.json', '--output', 'data/generated/en-stories-restored-flat.json']);
run('node', ['scripts/02-split-batches.mjs', '--input', 'data/generated/en-stories-restored-flat.json', '--out-dir', 'data/generated/batches', '--batch-size', '150']);
run('node', ['scripts/03-merge-en-stories-restored.mjs', '--repo-file', 'src/data/timeline/en-stories.json', '--batch-dir', 'data/generated/batches']);
run('node', ['scripts/04-validate-en-stories.mjs', '--file', 'src/data/timeline/en-stories.json']);
