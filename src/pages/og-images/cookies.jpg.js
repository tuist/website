import ogImage from "../../utils/og-image.js";

import { useTranslations, getLangFromUrl } from "../../i18n/utils";

export const GET = async function get({ request: { url }}) {
  const lang = getLangFromUrl(new URL(url));
  const t = useTranslations(lang);

  const png = await ogImage({
    title: t('cookies.og.image.title'),
    header: t('cookies.og.image.header'),
    footer: t('cookies.og.image.footer'),
    lang: lang
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
