import ogImage from "../../utils/og-image.js";

export const GET = async function get() {
  const png = await ogImage({
    title: "Tuist Cloud Privacy Policy",
    header: "Tuist Cloud",
    footer: "tuist.io · @tuistio",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
