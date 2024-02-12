import ogImage from "../../utils/og-image.js";

export const GET = async function get() {
  const png = await ogImage({
    title: "About Tuist GmbH",
    header: "Tuist Cloud",
    footer: "tuist.io · @tuistio",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
