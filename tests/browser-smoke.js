#!/usr/bin/env node
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png' };
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url,'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'text/plain');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport:{ width:390, height:844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url + '/dashboard.html');
    await page.waitForURL('**/login.html');
    await page.locator('#username').fill('wrong');
    await page.locator('#password').fill('wrong');
    await page.locator('#login-btn').click();
    await page.locator('#loginError:visible').waitFor();
    assert.match(page.url(), /login\.html/);
    await page.locator('#username').fill('demo');
    await page.locator('#password').fill('SILRS2026!');
    await page.locator('#login-btn').click();
    await page.waitForURL('**/dashboard.html');
    await page.getByText('Selamat Datang, Pasien Demo').waitFor();
    await page.goto(url + '/hasil.html');
    await page.locator('.result-card').first().waitFor();
    await page.locator('.search-container input').fill('tidak ditemukan');
    await page.locator('#resultEmptyState:visible').waitFor();
    await page.locator('.search-container input').fill('');
    await page.getByText('Lihat Detail').first().click();
    await page.waitForURL('**/detail-pemeriksaan.html');
    await page.locator('#markRead').click();
    await page.getByText('Sudah Dibaca').waitFor();
    await page.goto(url + '/jadwal.html');
    await page.locator('.calendar-grid .date-number').first().click();
    await page.goto(url + '/profil.html');
    await page.locator('#editProfile').click();
    await page.locator('.silrs-modal input[name="name"]').fill('Pasien Uji');
    await page.locator('.silrs-modal button[type="submit"]').click();
    await page.getByText('Pasien Uji').first().waitFor();
    await page.locator('#logout').click();
    await page.waitForURL('**/login.html');
    await page.goto(url + '/profil.html');
    await page.waitForURL('**/login.html');
    assert.deepEqual(errors, [], 'Browser runtime errors: ' + errors.join(' | '));
    console.log('Browser smoke passed: auth guard, credentials, dashboard, search, detail, schedule, profile, logout.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; }).finally(() => server.close());
