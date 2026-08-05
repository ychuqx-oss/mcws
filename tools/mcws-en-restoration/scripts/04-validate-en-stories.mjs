#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const file = path.resolve(arg('--file', 'src/data/timeline/en-stories.json'));
const entries = JSON.parse(fs.readFileSync(file, 'utf8'));
if (!Array.isArray(entries)) throw new Error('Expected top-level JSON array.');

const ids = entries.map((entry) => entry.id).filter(Boolean);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
const missingId = entries.filter((entry) => !entry.id).length;
const missingText = entries.filter((entry) => !entry.title && !entry.context).map((entry) => entry.id || '<missing-id>');
const protectedIds = ['s694', 's709', 's713', 's714', 's728', ...Array.from({ length: 43 }, (_, index) => `s${800 + index}`)];
const missingProtected = protectedIds.filter((id) => !ids.includes(id));

console.log(JSON.stringify({
  file,
  count: entries.length,
  missingId,
  duplicateIds,
  missingText,
  missingProtected,
}, null, 2));

if (missingId || duplicateIds.length || missingText.length || missingProtected.length) process.exitCode = 1;
