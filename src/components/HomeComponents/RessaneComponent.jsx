import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";
import Ressane from "../../assets/Photo3.png";

export default function CardComponents() {
    const [engineReady, setEngineReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadBasic(engine);
        }).then(() => {
            setEngineReady(true);
        });
    }, []);

    return (
        /* Le conteneur principal reste visible dès le départ pour éviter le CLS */
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 rounded-2xl bg-[#111d30fb] p-6 shadow-xl shadow-black/40 text-center md:flex-row md:gap-12 md:p-12 border border-slate-800">
            
            {/* TS Particles - Ne s'affiche que si prêt */}
            {engineReady && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0 -z-10 rounded-2xl overflow-hidden"
                    options={{
                        fullScreen: { enable: false },
                        background: { color: "transparent" },
                        fpsLimit: 120,
                        particles: {
                            number: { value: 60, density: { enable: true, area: 800 } },
                            color: { value: "#ffffff" },
                            links: {
                                enable: true,
                                color: "#ff005e",
                                distance: 130,
                                opacity: 0.6,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 1.2,
                                direction: "none",
                                outModes: { default: "out" },
                            },
                            size: { value: { min: 1, max: 3 } },
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: "grab" },
                            },
                        },
                    }}
                />
            )}

            {/* Conteneur Image + Badge */}
            <div className="relative shrink-0">
                <img
                    src={Ressane}
                    className="size-48 rounded-full border-4 border-slate-700/50 bg-slate-800/30 object-contain shadow-2xl backdrop-blur-xs sm:size-64 md:size-80 transition-transform duration-500 hover:scale-[1.02]"
                    alt="Photo de profil de Ressane Messioughi"
                    width="320"
                    height="320"
                />
                {/* Badge de disponibilité */}
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#111d30]/90 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-xs shadow-lg">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
                    Disponible
                </span>
            </div>

            {/* Conteneur Contenu (Textes + Liens) */}
            <div className="flex flex-col items-center md:items-start text-white">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Ressane Messioughi
                </h1>
                <p className="mt-2 text-lg text-slate-300 font-medium">
                    Développeur Fullstack React.JS | Node.JS | Bases de données
                </p>

                {/* Liste des réseaux sociaux sémantique */}
                <ul className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                    {/* DISCORD */}
                    <li>
                        <a
                            href="https://discord.gg/945MSs9n8a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5865F2] hover:border-[#5865F2] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5865F2]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111d30]"
                            aria-label="Rejoindre mon serveur Discord (ouvre un nouvel onglet)"
                        >
                            <svg 
                                className="w-5 h-5 text-slate-300 transition-colors duration-300 group-hover:text-white" 
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                            </svg>
                            Discord
                        </a>
                    </li>

                    {/* LINKEDIN */}
                    <li>
                        <a
                            href="https://fr.linkedin.com/in/ressane-messioughi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0A66C2]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111d30]"
                            aria-label="Consulter mon profil LinkedIn (ouvre un nouvel onglet)"
                        >
                            <svg 
                                className="w-5 h-5 text-slate-300 transition-colors duration-300 group-hover:text-white" 
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </li>

                    {/* GITHUB */}
                    <li>
                        <a
                            href="https://github.com/ressane-messioughi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#24292F] hover:border-[#444c56] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24292F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111d30]"
                            aria-label="Voir mon compte GitHub (ouvre un nouvel onglet)"
                        >
                            <svg 
                                className="w-5 h-5 text-slate-300 transition-colors duration-300 group-hover:text-white" 
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}