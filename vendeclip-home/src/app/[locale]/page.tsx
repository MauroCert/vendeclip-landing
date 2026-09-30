import View from "@/views/page";
import { setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';
const sourceMetadata = {};
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
