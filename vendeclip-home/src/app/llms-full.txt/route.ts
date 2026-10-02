import { guideResponse, llmGuide } from '@/lib/seo/llms';
export const dynamic = 'force-static';
export async function GET() {
  return guideResponse(await llmGuide('en', true), 'en');
}
