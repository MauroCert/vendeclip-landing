/* Regenerate the Open Scene brand assets: node scripts/brand/generate.cjs.
 * The Soft Studio wordmark uses Avenir Next Demi Bold with custom l/i details.
 * SVG is the source of truth; PNG/ICO files are compatibility exports.
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const wordmark = require('./wordmark.json');
const root = path.resolve(__dirname, '../..');
const defs = `<defs>
  <linearGradient id="top" x1="16" y1="31" x2="116" y2="65" gradientUnits="userSpaceOnUse"><stop stop-color="#238574"/><stop offset=".58" stop-color="#50bca5"/><stop offset="1" stop-color="#a3e3ce"/></linearGradient>
  <linearGradient id="left" x1="7" y1="40" x2="48" y2="112" gradientUnits="userSpaceOnUse"><stop stop-color="#103f38"/><stop offset="1" stop-color="#258675"/></linearGradient>
  <linearGradient id="bottom" x1="23" y1="109" x2="105" y2="111" gradientUnits="userSpaceOnUse"><stop stop-color="#185c50"/><stop offset="1" stop-color="#67d0b5"/></linearGradient>
  <linearGradient id="right" x1="118" y1="52" x2="107" y2="112" gradientUnits="userSpaceOnUse"><stop stop-color="#319b86"/><stop offset="1" stop-color="#124b41"/></linearGradient>
  <linearGradient id="coral" x1="96" y1="3" x2="111" y2="46" gradientUnits="userSpaceOnUse"><stop stop-color="#efa27d"/><stop offset="1" stop-color="#de795f"/></linearGradient>
</defs>`;
// Brighter surfaces preserve the frame silhouette on dark brand backgrounds.
const lightDefs = defs
  .replaceAll('#238574', '#78d6bc').replaceAll('#50bca5', '#b1efda').replaceAll('#a3e3ce', '#e2fff2')
  .replaceAll('#103f38', '#63bca4').replaceAll('#258675', '#9ee5cc')
  .replaceAll('#185c50', '#80cdb5').replaceAll('#67d0b5', '#c7f6e5')
  .replaceAll('#319b86', '#a8ebd3').replaceAll('#124b41', '#6ac6ac')
  .replaceAll('#efa27d', '#ffc09b').replaceAll('#de795f', '#f18b6e');
// Five purposeful surfaces and an open center; no background in the symbol.
const mark = `<path d="M75 22 116 1C120-1 124 1 123 6L119 44C118 37 114 34 109 32Z" fill="url(#coral)"/>
<path d="M6 42 22 25C27 20 33 19 40 21L109 40C115 42 119 47 119 54L106 68 48 47 22 39C15 37 10 37 6 42Z" fill="url(#top)"/>
<path d="M6 42C10 37 15 37 22 39L48 47C41 46 36 50 36 57V88C36 94 38 98 43 99L18 122C9 119 4 114 4 104V54C4 49 4 45 6 42Z" fill="url(#left)"/>
<path d="M43 99 102 109V120C102 125 98 127 91 127H24C21 127 19 125 18 122Z" fill="url(#bottom)"/>
<path d="M119 54V99C119 105 117 109 113 113L98 125C102 121 102 117 102 111V79C102 74 103 71 106 68Z" fill="url(#right)"/>`;
const svg = (body, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>\n`;
const logo = (ink, surfaces = defs) => svg(`${surfaces}<g transform="translate(9 18) scale(2.22)">${mark}</g><g transform="translate(330 238) scale(${850 / wordmark.width} -${850 / wordmark.width})" fill="${ink}"><path d="${wordmark.path}"/></g>`,1200,321);
const icon = svg(`${defs}<rect width="160" height="160" rx="35" fill="#faf9f5"/><g transform="translate(19 14) scale(.98)">${mark}</g>`,160,160);
const tile = svg(`${defs}<rect width="160" height="160" fill="#faf9f5"/><g transform="translate(21 16) scale(.95)">${mark}</g>`,160,160);
async function main() {
  const brand = path.join(root,'public/brand');
  await fs.writeFile(path.join(brand,'vendeclip-symbol.svg'),svg(`${defs}${mark}`,128,128));
  await fs.writeFile(path.join(brand,'vendeclip-logo.svg'),logo('#20352f'));
  await fs.writeFile(path.join(brand,'vendeclip-wordmark.svg'),svg(`<g transform="translate(0 116) scale(1 -1)" fill="#20352f"><path d="${wordmark.path}"/></g>`,Math.ceil(wordmark.width),150));
  await fs.writeFile(path.join(brand,'vendeclip-logo-light.svg'),logo('#faf9f5', lightDefs));
  await fs.writeFile(path.join(brand,'vendeclip-symbol-light.svg'),svg(`${lightDefs}${mark}`,128,128));
  const darkIcon = svg(`${lightDefs}<rect width="160" height="160" rx="35" fill="#153f36"/><g transform="translate(19 14) scale(.98)">${mark}</g>`,160,160);
  await fs.writeFile(path.join(brand,'vendeclip-app-icon-dark.svg'),darkIcon);
  await sharp(Buffer.from(darkIcon)).resize(512,512).png().toFile(path.join(brand,'vendeclip-app-icon-dark.png'));
  await fs.writeFile(path.join(brand,'vendeclip-app-icon.svg'),icon);
  await fs.writeFile(path.join(root,'src/app/icon.svg'),icon);
  await sharp(Buffer.from(logo('#20352f'))).png().toFile(path.join(brand,'vendeclip-logo.png'));
  await sharp(Buffer.from(tile)).resize(180,180).png().toFile(path.join(root,'src/app/apple-icon.png'));
  await sharp(Buffer.from(icon)).resize(512,512).png().toFile(path.join(brand,'vendeclip-app-icon.png'));
  const sizes = [16,32,48];
  const pngs = await Promise.all(sizes.map(s => sharp(Buffer.from(icon)).resize(s,s).png().toBuffer()));
  const header = Buffer.alloc(6 + sizes.length*16); header.writeUInt16LE(1,2); header.writeUInt16LE(sizes.length,4);
  let offset=header.length;
  pngs.forEach((png,i) => {const p=6+i*16;header[p]=sizes[i];header[p+1]=sizes[i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(png.length,p+8);header.writeUInt32LE(offset,p+12);offset+=png.length;});
  await fs.writeFile(path.join(root,'src/app/favicon.ico'),Buffer.concat([header,...pngs]));
  console.log('Generated SVG logos, symbol, app icon, PNG fallback, Apple icon and multi-size favicon.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
