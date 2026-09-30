import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const brand=path.join(root,'assets/brand');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
assert.equal(hash(fs.readFileSync(path.join(brand,'approved-original.png'))),'d4359384ffcf9676cc65abc3b5c53e6439f2b1797e88b36a74aa2d84b68d2abd');
for(const size of [16,32,48,64,128,256,512,1024]) {
  const png=fs.readFileSync(path.join(brand,`replay-loop-${size}.png`));
  assert.equal(png.readUInt32BE(16),size);
  assert.equal(png.readUInt32BE(20),size);
  assert.equal(png[25],6,'PNG must retain RGBA transparency');
}
const ico=fs.readFileSync(path.join(root,'favicon.ico'));
assert.equal(ico.readUInt16LE(2),1);
assert.equal(ico.readUInt16LE(4),6);
assert.deepEqual(ico,fs.readFileSync(path.join(brand,'replay.ico')));
const sizes=[];
for(let i=0;i<6;i++)sizes.push(ico[6+i*16]||256);
assert.deepEqual(sizes,[16,32,48,64,128,256]);
let pages=0;
for(const name of fs.readdirSync(root).filter(n=>n.endsWith('.html'))) {
  const html=fs.readFileSync(path.join(root,name),'utf8');
  assert.ok(html.includes('favicon.ico?v=loop-20260930'),name);
  assert.doesNotMatch(html,/class="auth-symbol"[^>]*><svg/);
  assert.doesNotMatch(html,/class="auth-checking-mark"[^>]*>R</);
  for(const match of html.matchAll(/(?:src|href)="((?:assets\/brand\/|favicon\.ico)[^"]+)"/g))
    assert.ok(fs.existsSync(path.join(root,match[1].split('?')[0])),`${name}: ${match[1]}`);
  pages++;
}
console.log(`Approved Re:Play identity: 8 PNG sizes, 6 ICO frames, ${pages} pages verified.`);
