import json,html,base64,mimetypes
from pathlib import Path
root=Path(__file__).resolve().parents[1]
previous=json.loads((root/'country-shortlist.json').read_text())
rows={r['code']:{'country':r['country'],'code':r['code'],'sentCampaigns':r['sentCampaigns'],'brands':[]} for r in previous}
brands={}
def add(id,name,countries,source,note='Official country presence; not a national ranking.'):
 file=next(iter(sorted((root/'logo-library').glob(id+'.*'))),None)
 if id not in brands:brands[id]={'id':id,'name':name,'logo':file.name if file else None,'confirmedCustomerWorkplace':id in ['compass','berkshire-hathaway','remax','safti']}
 for code in countries.split():
  if code in rows and not any(x['id']==id for x in rows[code]['brands']):rows[code]['brands'].append({'id':id,'source':source,'note':note})
# Each multi-country list is transcribed from the official directory cited here.
add('century21','CENTURY 21','AR AU BE BZ BO BR CA CL CO CR DO EC SV FR DE GR GT HN ID IT JP MX NI PA PY PE PH PT SA SG ZA ES TR GB US UY VE','https://join.century21.com/our-story/')
add('sothebys',"Sotheby’s International Realty",'AR AU BE BR CA CL CO CR DO FR DE GR HN ID IE IT JP MX NL PY PE PH PL PT SA SG ZA ES CH TR AE GB US UY','https://www.sothebysrealty.com/eng/sitemap/offices')
add('engel-volkers','Engel & Völkers','ZA AE BE CH DE ES FR GR IE IT NL PL PT BZ CA CR MX PA US CL CO UY','https://www.engelvoelkers.com/de/en/shops')
add('keller-williams','Keller Williams','AR BO BR CO CR DO FR GR HN IE IT JP MY MX NI PY PE PL PT ES TR UY','https://answers.kw.com/hc/en-us/articles/4405451586579-What-international-countries-regions-can-I-search-for-listings-in','Official listing coverage; source last updated 2023, needs fresh office-level check.')
add('coldwell-banker','Coldwell Banker','AR BE CR FR IT MX PL CH TR','https://blog.coldwellbanker.com/coldwell-banker-expands-to-5-new-countries-adds-27-offices-worldwide-in-q2-2025/')
add('coldwell-banker','Coldwell Banker','CA PT','https://blog.coldwellbanker.com/coldwell-banker-builds-momentum-in-q1-with-strategic-growth-at-home-and-around-the-globe/')
add('coldwell-banker','Coldwell Banker','CL US','https://blog.coldwellbanker.com/coldwell-banker-enters-its-120th-year-with-strategic-u-s-growth-and-global-expansion/')
add('savills','Savills','ID JP PH SG AU BE DK FR DE GR IE IT NL PL PT ES GB SA AE','https://www.savills.com/sectors/office-and-business-space.aspx','Official commercial-service coverage; not necessarily residential brokerage.')
add('savills','Savills','MY','https://www.savills.com/countries/asia-pacific.aspx')
add('citymax','CityMax','CR SV GT MX DO','https://www.citymax-la.com/')
# Prior sourced shortlist preserved, with its original scope/limitations.
lookup={'Ray White':'ray-white','ERA':'era','EDC':'edc','RE/MAX':'remax','Sherry FitzGerald':'sherry-fitzgerald','Mitsui Fudosan Realty':'mitsui','IQI':'iqi','PropNex':'propnex','Betterhomes':'betterhomes','Connells Group':'connells','Tecnocasa':'tecnocasa','Vivantus / Hendriks':'hendriks','Freedom':'freedom','Century 21':'century21','Engel & Völkers':'engel-volkers'}
for r in previous:
 id=lookup.get(r['candidate'])
 if id:add(id,r['candidate'],r['code'],r['source'],r['evidence'])
add('compass','Compass','US','https://www.compass.com/','Owner-confirmed workplace; US market.')
add('berkshire-hathaway','Berkshire Hathaway HomeServices','US','https://www.bhhs.com/','Owner-confirmed workplace; US market.')
add('safti','SAFTI','FR','https://www.safti.fr/','Owner-confirmed workplace; France market.')
add('iad','iad','FR','https://www.iadgroup.com/','French network; not a confirmed customer workplace.')
add('toribio-achaval','Toribio Achával','AR UY','https://www.toribioachaval.com.ar/','Official branch list includes Argentina and Colonia, Uruguay.')
add('royal-lepage','Royal LePage','CA','https://www.royallepage.ca/en/')
add('lj-hooker','LJ Hooker','AU','https://www.ljhooker.com.au/about-us')
add('danbolig','danbolig','DK','https://danbolig.dk/om-danbolig/')
add('tokyu-livable','Tokyu Livable','JP','https://www.livable.co.jp/solution/english/')
add('era-singapore','ERA Singapore','SG','https://www.era.com.sg/about-us')
add('ricardo-gorga','Ricardo Gorga','UY','https://www.ricardogorga.com.uy/')
add('dng','DNG','IE','https://www.dng.ie/about-dng-estate-agents')
add('zome','Zome','PT','https://www.zome.pt/pt/conhecer-a-zome/missao-visao-e-valores')
add('urbec','URBEC','EC','https://urbececuador.com/')
add('rent-a-house','Rent-A-House','VE','https://rentahouse.com.ve/')
add('hartamas','Hartamas','MY','https://hartamas.com/')
add('swiss-life-immopulse','Swiss Life Immopulse','CH','https://www.swisslife.ch/en/individuals/real-estate-mortgages/real-estate/about.html')
add('pam-golding','Pam Golding Properties','ZA','https://www.pamgolding.co.za/about-us')
add('lopes','Lopes','BR','https://www.lopes.com.br/paginas/quem-somos')
add('quintoandar','QuintoAndar','BR','https://www.quintoandar.com.br/newsroom/')
add('orpi','Orpi','FR','https://www.orpi.com/le-reseau-orpi/nous-connaitre')
add('foxtons','Foxtons','GB','https://www.foxtons.co.uk/foxtons/about','London and Surrey focus; not a UK-wide network claim.')
# This is research data only; it must not expand confirmed affiliations automatically.
catalog={'checkedAt':'2026-09-30','purpose':'Country brokerage research; not a customer list or endorsement.','brands':list(brands.values()),'countries':list(rows.values())}
(root/'expanded-country-catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
md=['# Expanded brokerage research — 30 September 2026','',f"44 campaign countries · {len(brands)} distinct brokerage brands · {sum(len(r['brands']) for r in rows.values())} sourced country/brand entries.",'','Each country has multiple candidates. Inclusion establishes the cited market presence, not VendeClip usage, logo permission, corporate partnership, or a comparable national size ranking. Keller Williams coverage uses an older 2023 source; Savills entries distinguish commercial coverage. Existing leadership notes are preserved in the JSON.','','## Country shortlist','','| Country | Companies with logo assets | Pending logo |','|---|---|---|']
for r in rows.values():
 ready=[brands[b['id']]['name'] for b in r['brands'] if brands[b['id']]['logo']]
 pending=[brands[b['id']]['name'] for b in r['brands'] if not brands[b['id']]['logo']]
 md.append(f"| {r['country']} ({r['code']}) | {', '.join(ready)} | {', '.join(pending) or '—'} |")
md+=['','## Files','','- `expanded-country-catalog.json`: country/brand mappings, source links, qualification notes, confirmation flags.','- `expanded-logo-sources.json`: 20 downloaded or extracted official logo sources, including a global-logo replacement.','- `gallery.html`: searchable local visual catalog, embeds images without hotlinking.','- `logo-library/`: original and newly sourced logos.','','Only Compass, Berkshire Hathaway HomeServices, RE/MAX, and SAFTI are owner-confirmed customer workplaces. This research does not modify the public customer section.']
(root/'EXPANDED-RESEARCH.md').write_text('\n'.join(md)+'\n')
# Self-contained review gallery; neither form submissions nor third-party scripts.
e=html.escape
parts=['''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VendeClip · Brokerage research</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f6f2;color:#182b24;font:16px system-ui}header{padding:48px max(24px,6vw);background:#173e33;color:white}h1{font-size:clamp(30px,5vw,56px);letter-spacing:-.05em;margin:12px 0}header p{max-width:800px;line-height:1.6;color:#d9e6dc}input{width:100%;max-width:700px;padding:16px;border:0;border-radius:10px;font:inherit}main{padding:24px max(24px,6vw)}section{margin:30px 0 50px}h2{font-size:26px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}.card{background:white;border:1px solid #dde3dd;border-radius:14px;overflow:hidden}.logo{height:120px;display:flex;align-items:center;justify-content:center;padding:20px}.logo.dark{background:#263e42}.logo img{max-width:100%;max-height:80px;object-fit:contain}.body{padding:16px;border-top:1px solid #edf0eb}.body strong{display:block}.body small{display:block;margin:9px 0;color:#626e66;font-size:12px;line-height:1.5}a{color:#166b52}.pending{color:#6b746d}footer{padding:30px}section[hidden]{display:none}</style><header><span>VENDECLIP · RESEARCH LIBRARY</span><h1>Real estate brands, market by market.</h1>''',f'<p>44 campaign countries · {len(brands)} brands. Official-source research; this is not a list of customers or partners. Missing assets and older sources are identified.</p><input id="search" type="search" placeholder="Search country, code or company…" aria-label="Search countries or companies"></header><main>']
for r in rows.values():
 terms=' '.join([r['country'],r['code']]+[brands[x['id']]['name'] for x in r['brands']])
 parts.append(f'<section data-search="{e(terms.lower(),quote=True)}"><h2>{e(r["country"])} <small>{r["code"]}</small></h2><div class="grid">')
 for row in r['brands']:
  b=brands[row['id']];file=b['logo'];dark=b['id'] in ['citymax','hartamas','sherry-fitzgerald','sothebys','connells','toribio-achaval']
  parts.append('<article class="card"><div class="logo'+(' dark' if dark else '')+'">')
  if file:
   mime=mimetypes.guess_type(file)[0] or 'image/png';data=base64.b64encode((root/'logo-library'/file).read_bytes()).decode();parts.append(f'<img loading="lazy" alt="{e(b["name"])}" src="data:{mime};base64,{data}">')
  else:parts.append('<span class="pending">Official logo still needed</span>')
  parts.append(f'</div><div class="body"><strong>{e(b["name"])}</strong><small>{e(row["note"])}</small><a href="{e(row["source"],quote=True)}" target="_blank" rel="noopener noreferrer">Official source ↗</a></div></article>')
 parts.append('</div></section>')
parts.append('''</main><script>document.getElementById('search').addEventListener('input',e=>{let q=e.target.value.trim().toLowerCase();document.querySelectorAll('section[data-search]').forEach(s=>s.hidden=!s.dataset.search.includes(q))})</script></html>''')
(root/'gallery.html').write_text(''.join(parts))
print('Brands:',len(brands),'country mappings:',sum(len(r['brands']) for r in rows.values()),'minimum ready logos:',min(sum(bool(brands[x['id']]['logo']) for x in r['brands']) for r in rows.values()))
print('Missing logos:',[b['name'] for b in brands.values() if not b['logo']])
