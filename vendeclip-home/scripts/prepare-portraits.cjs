const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
async function main() {
  const manifest = JSON.parse(fs.readFileSync('docs/portrait-generation.json', 'utf8'));
  fs.mkdirSync('public/media/people', { recursive: true });
  for (const [code, entry] of Object.entries(manifest)) {
    const target = path.join('public/media/people', `${code.toLowerCase()}.webp`);
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs > fs.statSync(entry.path).mtimeMs) continue;
    await sharp(entry.path).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 85 }).toFile(target);
  }
  console.log(`Prepared ${Object.keys(manifest).length} portrait assets.`);
}
main().catch(error => { console.error(error); process.exit(1); });
