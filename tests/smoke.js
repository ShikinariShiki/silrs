#!/usr/bin/env node
/* Static smoke checks. Run: node tests/smoke.js */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const pages = ['index.html','login.html','dashboard.html','hasil.html','jadwal.html','profil.html','detail-pemeriksaan.html'];
let checked = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root,page),'utf8');
  const attrs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1]);
  for (const ref of attrs) {
    if (/^(?:https?:|#|mailto:|tel:|data:)/i.test(ref) || !ref) continue;
    const pathname = ref.split(/[?#]/)[0];
    assert.ok(fs.existsSync(path.join(root,pathname)), page + ': missing local target ' + pathname);
    checked++;
  }
  if (page !== 'index.html') {
    assert.match(html,/js\/auth\.js/,page + ' must load demo auth guard');
    assert.match(html,/css\/prototype\.css/,page + ' must load shared stylesheet');
  }
}
const login=fs.readFileSync(path.join(root,'login.html'),'utf8');
const auth=fs.readFileSync(path.join(root,'js/auth.js'),'utf8');
const script=fs.readFileSync(path.join(root,'js/script.js'),'utf8');
assert.match(login,/id="username"/);
assert.match(login,/id="password"/);
assert.match(script,/SILRSAuth\?\.login/);
assert.match(auth,/sessionStorage/);
assert.match(auth,/location\.replace\('login\.html'\)/);
console.log('Static smoke checks passed: '+pages.length+' pages, '+checked+' local links/resources.');
