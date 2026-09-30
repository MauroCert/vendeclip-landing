
import { useLocalizer } from "@/i18n/use-localizer";
import { AuthPreview } from "@/components/auth-preview";
export const metadata = { title: "Create your account | VendeClip" };
export default function SignUpPage() {
  const localize = useLocalizer();
  return localize(<AuthPreview mode="sign-up" />);
}
