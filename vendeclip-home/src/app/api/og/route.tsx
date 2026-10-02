/* eslint-disable @next/next/no-img-element -- ImageResponse renders images without browser HTML. */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export async function GET() {
  const [photo, logo] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/brand/social-property.jpg')),
    readFile(path.join(process.cwd(), 'public/brand/vendeclip-logo.png')),
  ]);
  return new ImageResponse(
    <div style={{display:'flex',width:'100%',height:'100%',background:'#faf9f5',padding:40, gap:32}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:430,padding:'38px 10px'}}>
        <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width={390} height={106} style={{objectFit:'contain'}} />
        <div style={{display:'flex',width:108,height:108,borderRadius:54,background:'#377e6c',alignItems:'center',justifyContent:'center'}}>
          <svg width={45} height={45} viewBox="0 0 45 45"><path d="M12 5L39 22.5L12 40Z" fill="white" /></svg>
        </div>
        <div style={{display:'flex',fontSize:28,color:'#377e6c'}}>vendeclip.com</div>
      </div>
      <img src={`data:image/jpeg;base64,${photo.toString('base64')}`} alt="" width={626} height={550} style={{objectFit:'cover',borderRadius:24}} />
    </div>,
    {width:1200,height:630,headers:{'Cache-Control':'public, max-age=86400, s-maxage=604800'}},
  );
}
