import View from "@/views/(public)/how-it-works/page";
import { setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';
import { metadata as sourceMetadata } from "@/views/(public)/how-it-works/page";
export async function generateMetadata(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return localizedMetadata(sourceMetadata);
}
export default async function Page(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return <View />;
}
