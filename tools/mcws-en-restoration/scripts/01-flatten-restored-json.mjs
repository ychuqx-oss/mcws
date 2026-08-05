#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function clean(value = '') {
  return String(value).replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

function makeContext(row) {
  const contextOnly = clean(row.contextOnly || row.context || '');
  const sideNote = clean(row.sideNote || '');
  if (contextOnly && sideNote && !contextOnly.includes('Side note:')) return `${contextOnly}\n\nSide note: ${sideNote}`;
  if (contextOnly) return contextOnly;
  if (sideNote) return `Side note: ${sideNote}`;
  return '';
}

function toEntry(row) {
  const entry = { id: String(row.id || '').trim() };
  const title = clean(row.title || '');
  const context = makeContext(row);
  if (title) entry.title = title;
  if (context) entry.context = context;
  return entry;
}

const input = path.resolve(arg('--input', 'data/input/mcws_en_stories_restored_context_side_notes.json'));
const output = path.resolve(arg('--output', 'data/generated/en-stories-restored-flat.json'));
const source = JSON.parse(fs.readFileSync(input, 'utf8'));
const rows = [...(source.compendium || []), ...(source.googleFormSubmissions || [])];
const byId = new Map();

for (const row of rows) {
  const entry = toEntry(row);
  if (!entry.id) continue;
  const existing = byId.get(entry.id);
  if (!existing) {
    byId.set(entry.id, entry);
  } else {
    byId.set(entry.id, {
      ...existing,
      ...Object.fromEntries(Object.entries(entry).filter(([, value]) => value !== '')),
      context: [existing.context, entry.context].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join('\n\n'),
    });
  }
}

const flat = Array.from(byId.values()).sort((a, b) => {
  const an = Number(String(a.id).replace(/^s/, ''));
  const bn = Number(String(b.id).replace(/^s/, ''));
  if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
  return String(a.id).localeCompare(String(b.id));
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(flat, null, 2) + '\n');
console.log(`wrote ${output}: ${flat.length} entries`);
