import View from "@/views/(public)/resources/page";
import { setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';
import { metadata as sourceMetadata } from "@/views/(public)/resources/page";
export async function generateMetadata(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return localizedMetadata(sourceMetadata, '/resources');
}
export default async function Page(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return <View />;
}
