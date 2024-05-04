import { GET } from "../../og-images/cookies.jpg"
import { languagesExceptDefault } from "../../../i18n/ui";

export async function getStaticPaths() {
  return languagesExceptDefault.map((lang) => {
    return { params: { lang } };
  });
}

export { GET }