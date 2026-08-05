#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function populatedEntries(entry) {
  return Object.fromEntries(
    Object.entries(entry).filter(([, value]) => value !== '' && value !== null && value !== undefined)
  );
}

const repoFile = path.resolve(arg('--repo-file', 'src/data/timeline/en-stories.json'));
const batchDir = path.resolve(arg('--batch-dir', 'data/output/batches'));
const dryRun = process.argv.includes('--dry-run');

const current = JSON.parse(fs.readFileSync(repoFile, 'utf8'));
const byId = new Map(current.map((entry) => [entry.id, entry]));
const batchFiles = fs.readdirSync(batchDir)
  .filter((name) => /^en-stories-batch-\d+\.json$/.test(name))
  .sort();

let inserted = 0;
let updated = 0;

for (const file of batchFiles) {
  const batch = JSON.parse(fs.readFileSync(path.join(batchDir, file), 'utf8'));
  for (const incoming of batch) {
    if (!incoming.id) continue;
    const existing = byId.get(incoming.id);
    if (existing) {
      byId.set(incoming.id, { ...existing, ...populatedEntries(incoming) });
      updated += 1;
    } else {
      byId.set(incoming.id, populatedEntries(incoming));
      inserted += 1;
    }
  }
  console.log(`merged ${file}: ${batch.length} entries`);
}

const sorted = Array.from(byId.values()).sort((a, b) => {
  const an = Number(String(a.id).replace(/^s/, ''));
  const bn = Number(String(b.id).replace(/^s/, ''));
  if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
  return String(a.id).localeCompare(String(b.id));
});

console.log(`result: ${sorted.length} entries, ${inserted} inserted, ${updated} updated`);
if (!dryRun) {
  fs.writeFileSync(repoFile, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`wrote ${repoFile}`);
}
