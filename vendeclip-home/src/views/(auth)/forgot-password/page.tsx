
import { useLocalizer } from "@/i18n/use-localizer";
import { AuthPreview } from "@/components/auth-preview";
export const metadata = { title: "Reset your password | VendeClip" };
export default function ForgotPasswordPage() {
  const localize = useLocalizer();
  return localize(<AuthPreview mode="forgot-password" />);
}
