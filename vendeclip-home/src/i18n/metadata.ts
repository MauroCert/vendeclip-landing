import type { Metadata } from 'next';
import { getLocalizer } from './server';
export async function localizedMetadata(source: Metadata): Promise<Metadata> {
  const localize = await getLocalizer();
  return { ...source, title: typeof source.title === 'string' ? localize.text(source.title) : source.title, description: source.description ? localize.text(source.description) : source.description };
}
