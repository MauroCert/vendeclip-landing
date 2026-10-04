const fs=require('fs');const path=require('path');const sharp=require('../../../vendeclip-home/node_modules/sharp');
const dir=__dirname;
const base=path.resolve(dir,'../../../vendeclip-home/public/brand');
const data=s=>'data:image/svg+xml;base64,'+Buffer.from(s).toString('base64');
const symbols=[fs.readFileSync(path.join(base,'vendeclip-symbol.svg'),'utf8'),fs.readFileSync(path.join(base,'vendeclip-symbol-light.svg'),'utf8')];
const options=[['A','SOFT STUDIO','Rounder letters · curved l foot · angled i dot','soft'],['B','AIR','Lighter strokes · more breathing room · sculpted v','air'],['C','SCULPT','Bolder lowercase · compact spacing · stronger presence','sculpt'],['D','WIDE','Wider proportions · open spacing · understated detail','wide']];
let contents='';
for(let j=0;j<4;j++) {
 const [number,title,note,key]=options[j];const word=JSON.parse(fs.readFileSync(path.join(dir,key+'.json')));const y=160+j*272;
 contents+=`<text x="70" y="${y}" font-family="Arial,sans-serif" font-size="15" letter-spacing="2.5" fill="#42685c">${number} / ${title}</text><text x="70" y="${y+28}" font-family="Arial,sans-serif" font-size="16" fill="#718078">${note}</text>`;
 for(let k=0;k<2;k++) {
  const x=70+k*730;const ink=k?'#faf9f5':'#20352f';
  const stretch=key==='wide'?1.08:1; const sc=Math.min(0.76, 455/(word.width*stretch));
  const logo=`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="160" viewBox="0 0 650 160"><image href="${data(symbols[k])}" x="14" y="18" width="124" height="124"/><g fill="${ink}" transform="translate(165 111) scale(${sc*stretch} -${sc})"><path d="${word.path}"/></g></svg>`;
  fs.writeFileSync(path.join(dir,`${key}${k?'-dark':''}.svg`),logo);
  contents+=`<rect x="${x}" y="${y+55}" width="680" height="166" rx="18" fill="${k?'#153f36':'#fffefb'}" stroke="${k?'#153f36':'#e3e5dc'}"/><image href="${data(logo)}" x="${x+15}" y="${y+58}" width="650" height="160"/>`;
 }
}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1320"><rect width="1600" height="1320" fill="#faf9f5"/><text x="70" y="65" font-family="Arial,sans-serif" font-size="32" fill="#20352f">vendeclip — lowercase explorations</text><text x="70" y="102" font-family="Arial,sans-serif" font-size="18" fill="#718078">Building on option 3: four new directions, shown on light and dark backgrounds.</text>${contents}<text x="70" y="1277" font-family="Arial,sans-serif" font-size="16" fill="#718078">Typography studies · current website logo remains unchanged</text></svg>`;
fs.writeFileSync(path.join(dir,'comparison.svg'),svg);
sharp(Buffer.from(svg)).png().toFile(path.join(dir,'comparison.png')).then(()=>console.log('Wordmark comparison exported.'));
