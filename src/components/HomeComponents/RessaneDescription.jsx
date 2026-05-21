import TerminalComponent from "./TerminalComponent";
function RessaneDescription() {
  return (
    <section className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-6 px-4 md:px-0 xl:grid xl:grid-cols-2" aria-labelledby="about-title">
      
      {/* TERMINAL (desktop only) */}
      <TerminalComponent />

      {/* BLOC DESCRIPTION */}
      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[#111d30] p-6 text-white shadow-lg shadow-black/40">
        <p className="text-center text-base leading-relaxed text-gray-200 sm:text-lg xl:text-xl">
          Passionné par le développement web, je suis un développeur
          FullStack compétent dans la création d'applications web
          performantes et conviviales. Avec une expertise en React, Node.js,
          et bases de données, je conçois des solutions sur mesure pour
          répondre aux besoins des utilisateurs.
        </p>
      </div>

      {/* SECTION TECHNOLOGIES UTILISÉES */}
      <div className="rounded-xl bg-[#111d30] p-6 shadow-lg shadow-black/40 xl:col-span-2">
        <h3 className="mb-6 text-center text-lg font-semibold uppercase tracking-wider text-gray-400">
          Technologies & Outils
        </h3>
        
        {/* Grille responsive : 3 col sur mobile, 5 sur tablette, flex centré sur desktop */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7 xl:flex xl:flex-wrap xl:justify-center">
          <img
            src="https://images.icon-icons.com/2699/PNG/512/expressjs_logo_icon_169185.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Express.js"
            loading="lazy"
          />
          <img
            src="https://1000logos.net/wp-content/uploads/2023/10/React-Logo.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="React"
            loading="lazy"
          />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/332/149/small/js-icon-transparent-background-free-png.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="JavaScript"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Node.js"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="PHP"
            loading="lazy"
          />
          <img
            src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="TypeScript"
            loading="lazy"
          />
          <img
            src="https://brandlogos.net/wp-content/uploads/2022/05/figma-logo_brandlogos.net_6n1pb-512x512.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Figma"
            loading="lazy"
          />
          <img
            src="https://cdn.worldvectorlogo.com/logos/postman.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Postman"
            loading="lazy"
          />
          <img
            src="https://www.navicat.com/images/05.AboutUs_00_milestone_2021_Navicat.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Navicat"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/32/HeidiSQL_logo_image.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="HeidiSQL"
            loading="lazy"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="GitHub"
            loading="lazy"
          />
          <img
            src="https://blog.lecacheur.com/wp-content/uploads/2014/10/git_logo.png"
            className="mx-auto size-20 rounded-xl bg-gray-300/20 p-2 object-contain transition duration-300 ease-in-out hover:bg-white cursor-pointer"
            alt="Git"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default RessaneDescription;