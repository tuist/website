import { useEffect } from "preact/hooks";

export default function FeatureBase() {
  useEffect(() => {
    let win = window;

    const script = document.createElement("script");
    script.src = "https://do.featurebase.app/js/sdk.js";
    script.id = "featurebase-sdk";
    document.head.appendChild(script);

    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }
    win.Featurebase("initialize_portal_widget", {
      organization: "tuistcloud", // required
      placement: "right", // optional
      fullScreen: false, // optional
      initialPage: "MainView", // optional (MainView, RoadmapView, CreatePost, PostsView, ChangelogView)
    });
  }, []);
  return (
    <button
      data-featurebase-feedback-portal
      class="px-6 py-2 text-sm text-center text-white hover:to-indigo-400 duration-200 bg-gradient-to-r from-sky-400 to-indigo-500 font-medium hover:bg-white/5 rounded-xl hover:text-white focus:outline-none focus-visible:outline-black focus-visible:ring-black"
    >
      Roadmap
    </button>
  );
}
