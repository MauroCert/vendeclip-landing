
import { useLocalizer } from "@/i18n/use-localizer";
import { AuthPreview } from "@/components/auth-preview";
export const metadata = { title: "Sign in | VendeClip" };
export default function SignInPage() {
  const localize = useLocalizer();
  return localize(<AuthPreview mode="sign-in" />);
}
