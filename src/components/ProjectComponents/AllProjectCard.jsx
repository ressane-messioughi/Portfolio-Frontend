import { useFetch } from "../../hooks/useFetch.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RandomProjectCard() {
    const { apiFetch } = useFetch();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchProjectData() {
            try {
                const response = await apiFetch("/project", { method: "GET" });
                const result = await response.json();
                
                if (isMounted) {
                    // Mélange unique au chargement initial pour éviter les boucles de rendu
                    const shuffled = [...result].sort(() => 0.5 - Math.random());
                    setProjects(shuffled);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des projets:", err);
                if (isMounted) setIsLoading(false);
            }
        }
        fetchProjectData();
        return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-8" aria-live="polite">
                <p className="text-xl text-slate-400 animate-pulse">Chargement de mes projets...</p>
            </div>
        );
    }

    return (
        // Remplacement du fragment inutile par une balise sémantique section
        <section className="w-full max-w-6xl mx-auto px-4 py-8" aria-labelledby="projects-title">
            <h2 
                id="projects-title" 
                className="text-3xl md:text-4xl bg-[#111d30fb] text-white w-fit font-bold p-5 rounded-xl border border-slate-800 shadow-lg mb-8 tracking-wide uppercase"
            >
                Mes Projets
            </h2>

            {/* Grille responsive : 1 col sur mobile, 2 sur tablette, 3 sur desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/projects/${project.id}`}
                        // Focus-visible essentiel pour le 100% accessibilité au clavier
                        className="group relative flex flex-col h-full bg-[#111d30fb] text-white border border-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111d30fb]"
                    >
                        {/* Conteneur Image avec effet zoom au survol */}
                        <div className="relative w-full h-48 overflow-hidden bg-slate-900">
                            <img
                                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                                src={project.image_url}
                                alt={`Aperçu du projet : ${project.title}`}
                                loading="lazy"
                                width="400"
                                height="250"
                            />
                            {/* Overlay subtil au survol */}
                            <div className="absolute inset-0 bg-linear-to-t from-[#111d30fb] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>

                        {/* Contenu textuel */}
                        <div className="flex flex-col grow p-5 justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                {/* Optionnel : si tu veux réactiver la description plus tard */}
                                {project.description && (
                                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                                        {project.description}
                                    </p>
                                )}
                            </div>

                            {/* Le faux bouton (Sémantiquement correct : pas de bouton dans un lien) */}
                            <div className="pt-2">
                                <span
                                    className="inline-flex items-center text-sm font-semibold bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:translate-x-1"
                                >
                                    En savoir plus
                                    <svg
                                        className="w-4 h-4 ms-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default RandomProjectCard;