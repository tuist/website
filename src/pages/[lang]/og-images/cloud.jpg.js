import { GET } from "../../og-images/cloud.jpg"
import { languagesExceptDefault } from "../../../i18n/ui";

export async function getStaticPaths() {
  return languagesExceptDefault.map((lang) => {
    return { params: { lang } };
  });
}

export { GET }