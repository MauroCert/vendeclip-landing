import View from "@/views/(public)/layout";
import { setRequestLocale } from 'next-intl/server';
export default async function Layout({children, params}: {children: React.ReactNode; params: Promise<{locale?: string}>}) {
 setRequestLocale((await params).locale ?? 'en');
 return <View>{children}</View>;
}
