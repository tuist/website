import ogImage from "../../utils/og-image.js";

export const get = async function get() {
  const png = await ogImage({
    title: "Discover engaging stories and expert insights on our blog",
    header: "Tuist Blog",
    footer: "tuist.io/blog · @tuistio",
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
