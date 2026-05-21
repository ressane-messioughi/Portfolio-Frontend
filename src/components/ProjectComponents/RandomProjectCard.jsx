import { useFetch } from "../../hooks/useFetch.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RandomProjectCard() {
    const { apiFetch } = useFetch();
    const [randomProjects, setRandomProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProjectData() {
            try {
                const response = await apiFetch("/project", {
                    method: "GET" // Pas de body sur une requête GET
                });
                const result = await response.json();
                
                // Mélange et limitation directement à la source
                const shuffled = [...result]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8);

                setRandomProjects(shuffled);
            } catch (err) {
                console.error("Erreur lors de la récupération des projets:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 md:px-0" aria-labelledby="projects-heading">
            {/* Titre Sémantique (Plus de h1 doublon) */}
            <h2 id="projects-heading" className="w-fit rounded-xl border border-black bg-[#111d30fb] p-5 text-2xl font-bold text-white shadow-lg shadow-black/40 sm:text-3xl md:text-4xl">
                MES PROJETS :
            </h2>

            {/* Grille Responsive Adaptative */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                
                {/* ÉTAT DE CHARGEMENT : Évite le Layout Shift pour Lighthouse */}
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse rounded-xl bg-[#111d30fb] p-4 h-80 flex flex-col gap-4">
                            <div className="h-6 w-3/4 rounded bg-gray-700"></div>
                            <div className="h-40 w-full rounded-xl bg-gray-700"></div>
                            <div className="mt-auto h-10 w-full rounded-lg bg-gray-700"></div>
                        </div>
                    ))
                ) : (
                    /* AFFICHAGE DES PROJETS */
                    randomProjects.map((project) => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="group flex flex-col justify-between rounded-xl border border-black bg-[#111d30fb] p-4 text-white shadow-md shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                        >
                            <div>
                                <h3 className="mb-3 text-lg font-bold tracking-tight text-gray-100 group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>
                                
                                <div className="overflow-hidden rounded-xl bg-gray-800 p-2 border border-gray-700">
                                    <img
                                        className="h-40 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                                        src={project.image_url}
                                        alt={`Capture d'écran du projet ${project.title}`}
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Faux Bouton (Sémantiquement correct : c'est le lien entier qui agit) */}
                            <div className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-600 bg-transparent px-4 py-2.5 text-sm font-medium transition duration-300 group-hover:bg-white group-hover:text-black">
                                <span>En savoir plus</span>
                                <svg
                                    className="ms-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 12H5m14 0-4 4m4-4-4-4"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}

export default RandomProjectCard;