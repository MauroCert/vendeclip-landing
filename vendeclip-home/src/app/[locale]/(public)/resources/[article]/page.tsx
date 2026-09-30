import View from "@/views/(public)/resources/[article]/page";
import { setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';
import { generateMetadata as sourceMetadata } from "@/views/(public)/resources/[article]/page";
export async function generateMetadata(props: {params: Promise<{locale?: string; article: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return localizedMetadata(await sourceMetadata(props));
}
export const dynamicParams = false;
export { generateStaticParams } from "@/views/(public)/resources/[article]/page";
export default async function Page(props: {params: Promise<{locale?: string; article: string}>}) {
 const params = await props.params;
 setRequestLocale(params.locale ?? 'en');
 return <View params={props.params} />;
}
