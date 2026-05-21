function Footer() {
  return (
    <footer className="bg-[#111d30] border-t border-white/10 text-white">

      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col items-center gap-3">

        {/* TITRE */}
        <h1 className="text-xs md:text-sm font-medium tracking-wide text-center">
          MESSIOUGHI RESSANE
        </h1>

        {/* LINE */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="h-px w-6 bg-white/20"></span>
          <span>Full Stack Developer</span>
          <span className="h-px w-6 bg-white/20"></span>
        </div>

        {/* STACK ICONS */}
        <div className="flex items-center justify-center gap-4 mt-1">

          {/* React */}
          <a href="https://react.dev" target="_blank" className="hover:scale-110 transition">
            <img
              src="https://cdn.simpleicons.org/react/61DAFB"
              className="w-5 h-5"
              alt="React"
            />
          </a>

          {/* Express */}
          <a href="https://expressjs.com" target="_blank" className="hover:scale-110 transition">
            <img
              src="https://cdn.simpleicons.org/express/FFFFFF"
              className="w-5 h-5 invert"
              alt="Express"
            />
          </a>

          {/* MySQL */}
          <a href="https://www.mysql.com" target="_blank" className="hover:scale-110 transition">
            <img
              src="https://cdn.simpleicons.org/mysql/4479A1"
              className="w-5 h-5"
              alt="MySQL"
            />
          </a>

          {/* Tailwind */}
          <a href="https://tailwindcss.com" target="_blank" className="hover:scale-110 transition">
            <img
              src="https://cdn.simpleicons.org/tailwindcss/38BDF8"
              className="w-5 h-5"
              alt="Tailwind"
            />
          </a>

        </div>

        {/* QUOTE (compact) */}
        <p className="text-[10px] text-gray-500 italic text-center">
          Clean code • Clean design • Clean mindset
        </p>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/5 py-2 text-center text-[10px] text-gray-600">
        © {new Date().getFullYear()} — ALL RIGHTS RESERVED - DESIGN BY RESSANE
      </div>

    </footer>
  );
}

export default Footer;