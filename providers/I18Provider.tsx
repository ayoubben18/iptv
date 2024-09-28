import { I18nProviderClient } from "@/locales/client";

export const I18nProvider = ({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) => {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
};
