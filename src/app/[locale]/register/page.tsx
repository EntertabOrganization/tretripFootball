import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth/AuthForm";

export default async function RegisterPage({
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
        mode="register"
        labels={{
          title: t("registerTitle"),
          subtitle: t("registerSubtitle"),
          fullName: t("fullName"),
          email: t("email"),
          phoneNumber: t("phoneNumber"),
          password: t("password"),
          submit: t("registerSubmit"),
          alternatePrompt: t("haveAccount"),
          alternateAction: t("goLogin"),
          alternateHref: "/login",
        }}
      />
    </div>
  );
}
