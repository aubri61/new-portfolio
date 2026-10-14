import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./verify-built-css.mjs', import.meta.url));
const css = '.hero{}.project-section{}.flow-node{}@font-face{font-family:Pretendard}:root{--blue:#1029fe}';
const html = '<link rel="stylesheet" href="/_next/static/chunks/site.css?v=1">';

function verify(t, files) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-css-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(directory, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return spawnSync(process.execPath, [script], { cwd: directory, encoding: 'utf8' });
}

for (const htmlPath of [
  '.next/server/app/index.html',
  '.next/server/route-cache/APP_PAGE/route-owner/$/index.html',
  '.vercel/output/static/index.html',
]) {
  test(`validates homepage at ${htmlPath}`, t => {
    const cssPath = htmlPath.startsWith('.vercel/')
      ? '.vercel/output/static/_next/static/chunks/site.css'
      : '.next/static/chunks/site.css';
    const result = verify(t, { [htmlPath]: html, [cssPath]: css });
    assert.equal(result.status, 0, result.stderr);
  });
}

test('rejects missing homepage instead of skipping validation', t => {
  const result = verify(t, {});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Built homepage not found/);
});

test('rejects missing linked CSS', t => {
  const result = verify(t, { '.next/server/app/index.html': html });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Linked CSS asset not found/);
});

test('rejects stylesheet missing portfolio styles', t => {
  const result = verify(t, {
    '.next/server/app/index.html': html,
    '.next/static/chunks/site.css': ':root{--blue:blue}',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing portfolio style/);
});
