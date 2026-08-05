#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const input = path.resolve(arg('--input', 'data/generated/en-stories-restored-flat.json'));
const outDir = path.resolve(arg('--out-dir', 'data/generated/batches'));
const batchSize = Number(arg('--batch-size', '150'));
const entries = JSON.parse(fs.readFileSync(input, 'utf8'));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (let start = 0, index = 1; start < entries.length; start += batchSize, index += 1) {
  const batch = entries.slice(start, start + batchSize);
  const target = path.join(outDir, `en-stories-batch-${String(index).padStart(2, '0')}.json`);
  fs.writeFileSync(target, JSON.stringify(batch, null, 2) + '\n');
  console.log(`wrote ${target}: ${batch.length} entries`);
}
