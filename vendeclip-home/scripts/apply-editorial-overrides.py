import csv,json,re,pathlib,html
root=pathlib.Path(__file__).resolve().parents[1]/'src/i18n'
rows=list(csv.DictReader(open(root/'editorial-overrides.tsv'),delimiter='\t'))
for path in (root/'messages').glob('*.json'):
 locale=path.stem; data=json.load(open(path))
 if locale.startswith('en'):data.update(json.load(open(root/'legal-en.json')))
 for key,value in list(data.items()):
  data[key]=re.sub(r'\s+([,.;!?])',r'\1',html.unescape(value.replace('▁',' '))).strip()
 for row in rows:
  key=row['source'].strip()
  if locale in row:data[key]=row[locale]
  elif locale.startswith('en'):data[key]=key
 for key in list(data):
  if key.endswith(' | VendeClip'):
   base=key[:-12];data[key]=data.get(base,base)+' | VendeClip'
  if key=='VendeClip — Great properties deserve great videos':data[key]='VendeClip — '+data.get('Great properties deserve great videos.', 'Great properties deserve great videos.').rstrip('.')
  if key.lower() in ['essential','growth','pro','vendeclip','instagram','tiktok','youtube','youtube shorts','whatsapp','facebook','linkedin','google','villa luma','usd','ai','1080p','4k']:data[key]=key
 if locale.startswith('en'):
  data.update({'Fecha de vigencia:':'Effective date:', 'Contenido del documento':'Document contents', 'Contenido':'Contents', 'Contacto legal':'Legal contact', 'Para consultas sobre estos documentos, escribinos a':'For questions about these documents, write to'})
 # These lowercase labels are rendered from stable English state values.
 for key in ['AI video','Music','Templates','Your presenter','Voiceover','Captions & scripts','Branding','Property websites','Leads','Analytics','Page views','Video plays','Contact actions']:
  if key in data:data[key.lower()]=data[key]
 if locale=='en-gb':
  spelling={'color':'colour','colors':'colours','personalize':'personalise','personalized':'personalised','personalization':'personalisation','center':'centre','favorite':'favourite','organize':'organise','organized':'organised','organization':'organisation','organizations':'organisations','analyze':'analyse','authorized':'authorised','authorization':'authorisation','unauthorized':'unauthorised','customize':'customise','customized':'customised','behavior':'behaviour','behavioral':'behavioural'}
  def british(match):
   original=match.group(); replacement=spelling[original.lower()]
   return replacement.capitalize() if original[0].isupper() else replacement
  for key in data:data[key]=re.sub(r'\b('+'|'.join(spelling)+r')\b',british,data[key],flags=re.I)
 path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Applied editorial overrides to all language files.')
