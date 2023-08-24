export default function RandomTestimonial({ testimonials }) {
  const testimony =
    testimonials[Math.floor(Math.random() * testimonials.length)];

  return (
    <div className="p-4 lg:p-10 text-center basis-2/3">
      <img
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white ring-offset-4 ring-offset-vulcan-900"
        src={testimony.data.avatar_href}
        alt=""
      />

      <div>
        <p className="text-slate-400 text-xs mt-8">
          <strong className="text-white">{testimony.data.name}</strong> ―{" "}
          {testimony.data.role} at {testimony.data.company}
        </p>
      </div>
      <div className="mt-4 text-base text-slate-400 line-clamp-10">
        {testimony.data.testimony}
      </div>
      <div className="flex gap-1 mx-auto justify-center mt-6">
        <svg
          className="icon icon-tabler fill-cyan-400 h-4 icon-tabler-star text-cyan-400 w-4"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        </svg>
        <svg
          className="icon icon-tabler fill-cyan-400 h-4 icon-tabler-star text-cyan-400 w-4"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        </svg>
        <svg
          className="icon icon-tabler fill-cyan-400 h-4 icon-tabler-star text-cyan-400 w-4"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        </svg>
        <svg
          className="icon icon-tabler fill-cyan-400 h-4 icon-tabler-star text-cyan-400 w-4"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        </svg>
        <svg
          className="icon icon-tabler fill-cyan-400 h-4 icon-tabler-star text-cyan-400 w-4"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          xmlns="http://www.w3.org/2000/svg"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        </svg>
      </div>
    </div>
  );
}
