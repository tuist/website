export const CloudCTA = () => {
  return (
    <section className="relative">
      <div className="max-w-7xl px-8 md:px-12 lg:px-32 mx-auto pb-12 md:py-12 relative">
        <div className="grid grid-cols-1 gap-10 xl:gap-24">
          <div className="prose max-w-max">
            <div className="flex flex-col p-[0.060rem] shadow-2xl rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-500/5">
              <div className="bg-vulcan-900 px-6 sm:px-8 lg:py-8 rounded-3xl h-full">
                <h3 className="mt-5 text-xl text-white">
                  <span className="text-2xl">Tuist Cloud</span>
                </h3>
                <p className="flex flex-col order-last my-4 text-base text-slate-400 gap-y-3">
                Speed up your workflows (and save money) with binary caching and selective testing, and get actionable insights to ensure your projects grow healthily.
                </p>
                <a
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-center text-white hover:to-indigo-400 duration-200 bg-gradient-to-r from-sky-400 to-indigo-500 font-medium rounded-xl hover:text-white focus:outline-none focus-visible:outline-black focus-visible:ring-black mt-8 no-underline"
                  aria-label="Sign up for testing"
                  href='https://docs.tuist.io/cloud/what-is-cloud'
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
