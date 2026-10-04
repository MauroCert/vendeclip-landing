const fs=require('fs');const path=require('path');const sharp=require('../../../vendeclip-home/node_modules/sharp');
const dir=__dirname;
const base=path.resolve(dir,'../../../vendeclip-home/public/brand');
const data=s=>'data:image/svg+xml;base64,'+Buffer.from(s).toString('base64');
const symbols=[fs.readFileSync(path.join(base,'vendeclip-symbol.svg'),'utf8'),fs.readFileSync(path.join(base,'vendeclip-symbol-light.svg'),'utf8')];
const options=[['01','GEOMETRIC','Manrope SemiBold · open, friendly, contemporary','manrope'],['02','QUIET CONFIDENCE','Neue Montreal Medium · lighter and restrained','montreal'],['03','CUSTOM WORDMARK','Lowercase · sculpted v and a cut-angle i dot','custom']];
let contents='';
for(let j=0;j<3;j++) {
 const [number,title,note,key]=options[j];const word=JSON.parse(fs.readFileSync(path.join(dir,key+'.json')));const y=172+j*290;
 contents+=`<text x="70" y="${y}" font-family="Arial,sans-serif" font-size="15" letter-spacing="2.5" fill="#42685c">${number} / ${title}</text><text x="70" y="${y+28}" font-family="Arial,sans-serif" font-size="16" fill="#718078">${note}</text>`;
 for(let k=0;k<2;k++) {
  const x=70+k*730;const ink=k?'#faf9f5':'#20352f';
  const sc=455/word.width;
  const logo=`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="160" viewBox="0 0 650 160"><image href="${data(symbols[k])}" x="14" y="18" width="124" height="124"/><g fill="${ink}" transform="translate(165 111) scale(${sc} -${sc})"><path d="${word.path}"/></g></svg>`;
  fs.writeFileSync(path.join(dir,`${key}${k?'-dark':''}.svg`),logo);
  contents+=`<rect x="${x}" y="${y+55}" width="680" height="166" rx="18" fill="${k?'#153f36':'#fffefb'}" stroke="${k?'#153f36':'#e3e5dc'}"/><image href="${data(logo)}" x="${x+15}" y="${y+58}" width="650" height="160"/>`;
 }
}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100"><rect width="1600" height="1100" fill="#faf9f5"/><text x="70" y="65" font-family="Arial,sans-serif" font-size="32" fill="#20352f">VendeClip — wordmark explorations</text><text x="70" y="102" font-family="Arial,sans-serif" font-size="18" fill="#718078">One symbol. Three typographic personalities. Light and dark applications.</text>${contents}<text x="70" y="1060" font-family="Arial,sans-serif" font-size="16" fill="#718078">Typography studies · current website logo remains unchanged</text></svg>`;
fs.writeFileSync(path.join(dir,'comparison.svg'),svg);
sharp(Buffer.from(svg)).png().toFile(path.join(dir,'comparison.png')).then(()=>console.log('Wordmark comparison exported.'));
