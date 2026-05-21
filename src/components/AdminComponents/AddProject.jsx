import { toast } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { TriangleAlert, CirclePlus, Image as ImageIcon, Video, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddProject() {
    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onTouched" });

    const navigate = useNavigate();
    const { apiFetch } = useFetch();

    // On "observe" les champs d'URL pour générer les previews en direct
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedImageUrl = watch("image_url");
    const watchedVideoUrl = watch("video_url");
    const watchedPic1 = watch("picture_1");
    const watchedPic2 = watch("picture_2");
    const watchedPic3 = watch("picture_3");
    const watchedPic4 = watch("picture_4");

    // Helper pour formater ou valider les lecteurs vidéo (gère YouTube & MP4 classiques)
    const renderVideoPreview = (url) => {
        if (!url) return null;
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const embedUrl = url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/");
            return (
                <iframe 
                    src={embedUrl} 
                    className="w-full h-48 rounded-xl border border-slate-700 bg-black" 
                    title="Aperçu vidéo YouTube"
                    allowFullScreen
                />
            );
        }
        return (
            <video src={url} controls className="w-full h-48 rounded-xl border border-slate-700 bg-black" />
        );
    };

    const handleSubmitProject = async (projectData) => {
        try {
            const response = await apiFetch(`/project`, {
                method: "POST",
                body: JSON.stringify(projectData),
            });
            const result = await response.json();
            
            if (response.ok) {
                toast.success("Projet injectée avec succès ! 🚀");
                navigate("/admin");
            } else {
                toast.error(result || "Erreur lors de la création de la ressource.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Échec critique de la communication serveur.");
        }
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8 font-sans text-slate-200" aria-labelledby="add-project-title">
            
            {/* Header / Navigation Retour */}
            <header className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-6 mb-10">
                <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500" />
                    <CirclePlus className="w-7 h-7 text-cyan-400" />
                    <h1 id="add-project-title" className="text-xl md:text-2xl text-white font-extrabold tracking-wider uppercase">
                        Ajouter un projet
                    </h1>
                </div>

                <button 
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all duration-200 cursor-pointer text-sm font-semibold text-slate-300"
                >
                    <ArrowLeft className="w-4 h-4" /> Retour au Panel
                </button>
            </header>

            {/* Corps Principal divisé en 2 : Formulaire à gauche, Live Holographic Preview à droite */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* FORMULAIRE (Prend 2 colonnes sur grand écran) */}
                <form 
                    onSubmit={handleSubmit(handleSubmitProject)}
                    className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col gap-6"
                >
                    <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-500 border-b border-slate-800 pb-2"> Principal </h2>
                    
                    {/* SECTION 1 : Informations Principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="title">Titre du Projet *</label>
                            <input 
                                type="text" id="title" placeholder="Ex: Dashboard Analytics E-commerce"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("title", { required: "Titre obligatoire" })} 
                            />
                            {errors.title && <p className="text-xs text-rose-500 flex gap-1.5 items-center mt-1"><TriangleAlert className="w-3.5 h-3.5" />{errors.title.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="tech_stack">Stack Technique</label>
                            <input 
                                type="text" id="tech_stack" placeholder="Ex: React, Node.js, Tailwind, MySQL"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("tech_stack")} 
                            />
                        </div>
                    </div>

                    {/* SECTION 2 : Descriptions & Textes Complémentaires (SQL Fields matching) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="description">Description Brève *</label>
                        <textarea 
                            id="description" rows="2" placeholder="Résumé d'accroche du projet..."
                            className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                            {...register("description", { required: "Description obligatoire" })} 
                        />
                        {errors.description && <p className="text-xs text-rose-500 flex gap-1.5 items-center mt-1"><TriangleAlert className="w-3.5 h-3.5" />{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="text_one">Bloc de Texte Principal (text_one)</label>
                            <textarea 
                                id="text_one" rows="3" placeholder="Détails approfondis de la conception, problématiques résolues..."
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                {...register("text_one")} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="text_two">Bloc de Texte Secondaire (text_two)</label>
                            <textarea 
                                id="text_two" rows="3" placeholder="Fonctionnalités clés installées, retours d'expérience..."
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                {...register("text_two")} 
                            />
                        </div>
                    </div>

                    {/* SECTION 3 : Liens Web (URLs) */}
                    <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-500 border-b border-slate-800 pb-2 mt-4">Secondaire </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="github_url">Dépôt GitHub (URL)</label>
                            <input 
                                type="url" id="github_url" placeholder="https://github.com/..."
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("github_url")} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="demo_url">Lien Démo Live (URL)</label>
                            <input 
                                type="url" id="demo_url" placeholder="https://monprojet.com"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("demo_url")} 
                            />
                        </div>
                    </div>

                    {/* SECTION 4 : Médias principaux & Galerie SQL */}
                    <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-500 border-b border-slate-800 pb-2 mt-4">Média</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="image_url">Image de Couverture principale (URL)</label>
                            <input 
                                type="url" id="image_url" placeholder="https://images.unsplash.com/..."
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("image_url")} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-400" htmlFor="video_url">Vidéo de Présentation (URL MP4 / YouTube)</label>
                            <input 
                                type="url" id="video_url" placeholder="https://www.youtube.com/watch?v=..."
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                {...register("video_url")} 
                            />
                        </div>
                    </div>

                    {/* Sous-galerie des 4 photos secondaires de la bdd */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/30 p-4 rounded-2xl border border-slate-800/60">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500" htmlFor={`picture_${num}`}>Image Galerie {num} (URL)</label>
                                <input 
                                    type="url" id={`picture_${num}`} placeholder={`https://lien-image-${num}.jpg`}
                                    className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    {...register(`picture_${num}`)} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Bouton d'action final */}
                    <motion.button 
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 py-4 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50 transition-all uppercase tracking-wider text-sm font-mono"
                    >
                        {isSubmitting ? "Envoi du projet..." : "Enregistrer le Projet"}
                    </motion.button>
                </form>

                {/* PANNEAU DE PREVIEW COMPATIBLE (Prend 1 colonne) */}
                <aside className="sticky top-8 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl flex flex-col gap-6 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-3">
                        <Eye className="w-4 h-4 text-cyan-400" /> Live Hologram Preview
                    </div>

                    {/* Preview Couverture Principale */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5 text-cyan-500" /> Couverture Principale
                        </span>
                        {watchedImageUrl ? (
                            <img src={watchedImageUrl} alt="Aperçu couverture" className="w-full h-36 object-cover rounded-xl border border-slate-700 shadow-md bg-slate-950" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                            <div className="w-full h-36 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs font-mono text-slate-600 bg-slate-950/20">Aucune source d'image détectée</div>
                        )}
                    </div>

                    {/* Preview Vidéo */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-purple-500" /> Clip Présentation
                        </span>
                        {watchedVideoUrl ? (
                            renderVideoPreview(watchedVideoUrl)
                        ) : (
                            <div className="w-full h-36 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs font-mono text-slate-600 bg-slate-950/20">Aucun flux vidéo paramétré</div>
                        )}
                    </div>

                    {/* Grid Preview Mini Galerie Secondaire */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Flux Galerie Annexes</span>
                        <div className="grid grid-cols-2 gap-2">
                            {[watchedPic1, watchedPic2, watchedPic3, watchedPic4].map((pic, idx) => (
                                pic ? (
                                    <img key={idx} src={pic} alt={`Aperçu gallery ${idx+1}`} className="w-full h-16 object-cover rounded-lg border border-slate-800 bg-slate-950" onError={(e) => { e.target.style.display = 'none'; }} />
                                ) : (
                                    <div key={idx} className="h-16 border border-dashed border-slate-800/50 rounded-lg bg-slate-950/10 flex items-center justify-center text-[10px] font-mono text-slate-700">P_{idx+1} empty</div>
                                )
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </section>
    );
}

export default AddProject;