import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth/AuthForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Auth");

  return (
    <div className="shell">
      <AuthForm
        locale={locale}
        mode="login"
        labels={{
          title: t("loginTitle"),
          subtitle: t("loginSubtitle"),
          fullName: t("fullName"),
          email: t("email"),
          phoneNumber: t("phoneNumber"),
          password: t("password"),
          submit: t("loginSubmit"),
          alternatePrompt: t("needAccount"),
          alternateAction: t("goRegister"),
          alternateHref: "/register",
        }}
      />
    </div>
  );
}
