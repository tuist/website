import ogImage from "../../utils/og-image.js";

export const get = async function get() {
  const png = await ogImage({
    title: "Premium features for enhanced productivity, collaboration, and project health.",
    header: "Tuist Cloud",
    footer: "tuist.io/blog · @tuistio",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
