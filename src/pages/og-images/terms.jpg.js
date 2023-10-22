import ogImage from "../utils/og-image.js";

export const get = async function get() {
  const png = await ogImage({
    title: "Terms of Service",
    header: "Tuist Cloud",
    footer: "tuist.io · @tuistio",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
