const ts=require('typescript'),fs=require('fs');
const catalog=JSON.parse(fs.readFileSync('src/i18n/messages/en.json'));
const legal=JSON.parse(fs.readFileSync('src/i18n/legal-en.json'));
const keys=new Set(Object.keys(catalog).filter(key=>key.length<=110&&!Object.hasOwn(legal,key)));
for(const file of [...fs.readdirSync('src/components').filter(f=>f.endsWith('.tsx')).map(f=>'src/components/'+f),'src/lib/analytics-demo.ts']){
 const source=fs.readFileSync(file,'utf8');if(!source.includes('"use client"')&&!source.includes("'use client'")&&!file.includes('analytics-demo'))continue;
 const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 function add(s){s=s.replace(/\s+/g,' ').trim();if(Object.hasOwn(catalog,s))keys.add(s)}
 function visit(n){if(ts.isStringLiteral(n)||ts.isJsxText(n))add(n.text);if(ts.isTemplateExpression(n)){let s=n.head.text;n.templateSpans.forEach((p,i)=>s+=`{${i}}`+p.literal.text);add(s)}ts.forEachChild(n,visit)}visit(sf);
}
fs.writeFileSync('src/i18n/client-keys.json',JSON.stringify([...keys],null,2)+'\n');console.log('Client strings:',keys.size,'of',Object.keys(catalog).length);
