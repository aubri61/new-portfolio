import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)]
  .map(match => match[0])
  .filter(tag => /rel="stylesheet"/.test(tag))
  .map(tag => tag.match(/href="([^"]+)"/)?.[1])
  .filter(Boolean);
assert.ok(stylesheets.length, 'Built page has no stylesheet links');
const css = stylesheets.map(href => {
  assert.ok(href.startsWith('/_next/static/'), `Unexpected CSS path: ${href}`);
  const asset = path.join('.next/static', href.replace('/_next/static/', '').split('?')[0]);
  return fs.readFileSync(asset, 'utf8');
}).join('\n');
for (const required of ['.hero{', '.project-section{', '.flow-node{', 'Pretendard', '--blue:']) {
  assert.ok(css.includes(required), `Built stylesheet is missing portfolio style: ${required}`);
}
console.log(`Verified ${stylesheets.length} linked stylesheet(s): portfolio layout, diagrams, font and theme are present.`);
