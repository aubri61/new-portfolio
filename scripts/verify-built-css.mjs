import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function findHomePages(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return findHomePages(file);
    return entry.isFile() && entry.name === 'index.html' && path.basename(directory) === '$'
      ? [file]
      : [];
  });
}

// Turbopack stores prerenders by route owner; webpack retains the legacy app path.
const candidates = [
  ...findHomePages('.next/server/route-cache/APP_PAGE'),
  '.next/server/app/index.html',
  '.vercel/output/static/index.html',
];
const htmlPath = candidates.find(file => fs.existsSync(file));
assert.ok(htmlPath, `Built homepage not found. Checked: ${candidates.join(', ') || '.next/server/route-cache/APP_PAGE'}`);
const html = fs.readFileSync(htmlPath, 'utf8');
const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)]
  .map(match => match[0])
  .filter(tag => /rel="stylesheet"/.test(tag))
  .map(tag => tag.match(/href="([^"]+)"/)?.[1])
  .filter(Boolean);
assert.ok(stylesheets.length, 'Built page has no stylesheet links');
const css = stylesheets.map(href => {
  assert.ok(href.startsWith('/_next/static/'), `Unexpected CSS path: ${href}`);
  const relativeAsset = href.replace('/_next/static/', '').split(/[?#]/)[0];
  const asset = ['.next/static', '.vercel/output/static/_next/static']
    .map(directory => path.join(directory, relativeAsset))
    .find(file => fs.existsSync(file));
  assert.ok(asset, `Linked CSS asset not found: ${href}`);
  return fs.readFileSync(asset, 'utf8');
}).join('\n');
for (const required of ['.hero{', '.project-section{', '.flow-node{', 'Pretendard', '--blue:']) {
  assert.ok(css.includes(required), `Built stylesheet is missing portfolio style: ${required}`);
}
console.log(`Verified ${stylesheets.length} linked stylesheet(s) from ${htmlPath}: portfolio layout, diagrams, font and theme are present.`);
