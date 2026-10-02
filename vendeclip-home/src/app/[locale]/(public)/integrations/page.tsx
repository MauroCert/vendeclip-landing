import View from "@/views/(public)/integrations/page";
import { setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';
import { metadata as sourceMetadata } from "@/views/(public)/integrations/page";
export async function generateMetadata(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return localizedMetadata(sourceMetadata, '/integrations');
}
export default async function Page(props: {params: Promise<{locale?: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return <View />;
}
