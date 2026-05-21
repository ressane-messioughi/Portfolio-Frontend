import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import {  
    Save, 
    ArrowLeft, 
    Image as ImageIcon, 
    Video, 
    Eye, 
    Settings2,
    Database,
    Cpu,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiFetch } = useFetch();
    const [isLoadingData, setIsLoadingData] = useState(true);
    
    // 1. AJOUT DU STATE POUR LES DONNÉES DE L'API
    const [projectData, setProjectData] = useState(null);

    // 2. CONFIGURATION DE USEFORM AVEC L'OPTION DYNAMIQUE "values"
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors, isSubmitting, isDirty } 
    } = useForm({ 
        mode: "onTouched",
        values: projectData // Synchronise automatiquement le formulaire sans figer les champs
    });

    // Surveillance des URLs pour la preview
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedFields = watch(["image_url", "video_url", "picture_1", "picture_2", "picture_3", "picture_4"]);
    const [imgPreview, vidPreview, pic1, pic2, pic3, pic4] = watchedFields;

    // 3. RÉCUPÉRATION DES DONNÉES ET NETTOYAGE DES VALEURS NULL
    useEffect(() => {
    async function loadProject() {
        try {
            const response = await apiFetch(`/project/${id}`, { method: "GET" });
            const data = await response.json();

            if (response.ok) {

                const cleanedData = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                        key,
                        value === null ? "" : value
                    ])
                );

                setProjectData(cleanedData);
                setIsLoadingData(false);

            } else {
                toast.error("Projet introuvable dans la base de données.");
                navigate("/admin");
            }

        } catch (error) {
            console.error(error);
            toast.error("Erreur de liaison avec le serveur.");
        }
    }

    loadProject();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);
    // 4. MISE À JOUR DES DONNÉES EN BDD
    const onUpdateProject = async (formData) => {
        try {
            const response = await apiFetch(`/project/${id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                toast.success("Noyau du projet mis à jour ! ✨");
                navigate("/admin");
            } else {
                const errorResult = await response.json();
                toast.error(errorResult || "Erreur lors de la synchronisation.");
            }
        } catch (error) {
            toast.error("Échec de la transmission des données.");
            console.error(errors, error);
        }
    };

    // Helper Vidéo
    const renderVideo = (url) => {
        if (!url) return null;
        const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
        if (isYoutube) {
            const embed = url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/");
            return <iframe src={embed} className="w-full h-40 rounded-xl border border-slate-700 bg-black" title="vid" />;
        }
        return <video src={url} controls className="w-full h-40 rounded-xl border border-slate-700 bg-black" />;
    };

    if (isLoadingData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#0a0f18] text-cyan-500">
                <Cpu className="w-12 h-12 animate-pulse mb-4" />
                <p className="font-mono text-sm uppercase tracking-widest animate-bounce">Chargement du module {id}...</p>
            </div>
        );
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8 font-sans text-slate-200">
            
            {/* Header avec Fil d'Ariane et Statut */}
            <header className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-6 mb-10">
                <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md border border-amber-500/20 p-5 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                    <Settings2 className="w-7 h-7 text-amber-400" />
                    <div>
                        <h1 className="text-xl md:text-2xl text-white font-extrabold tracking-wider uppercase leading-none">
                            Édition du Module
                        </h1>
                        <p className="text-[10px] font-mono text-amber-500/70 mt-1 uppercase">UUID: {id}</p>
                    </div>
                </div>
                <div className="flex">
                <button 
                    onClick={() => navigate("/admin")}
                    className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all text-sm font-semibold text-slate-300 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Annuler les modifications
                </button>
                <button 
                    onClick={() => navigate(`/projects/${id}`)}
                    className="group cursor-pointer flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all text-sm font-semibold text-slate-300"
                >
                     Voir la page <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* FORMULAIRE PRINCIPAL */}
                <form 
                    onSubmit={handleSubmit(onUpdateProject)}
                    className="relative z-10 lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
                >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                        <Database className="w-4 h-4" /> Configuration_Champs_SQL
                    </div>

                    {/* Champs de base */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-400" htmlFor="title">Titre *</label>
                            <input 
                                type="text" id="title"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                                {...register("title", { required: "Le titre est vital" })} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-400" htmlFor="tech_stack">Stack Technique</label>
                            <input 
                                type="text" id="tech_stack"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                                {...register("tech_stack")} 
                            />
                        </div>
                    </div>

                    {/* Description & Textes */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-mono uppercase text-slate-400" htmlFor="description">Résumé *</label>
                        <textarea 
                            id="description" rows="2"
                            className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                            {...register("description", { required: "Résumé requis" })} 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-400" htmlFor="text_one">Bloc de données 1</label>
                            <textarea 
                                id="text_one" rows="4"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                                {...register("text_one")} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-400" htmlFor="text_two">Bloc de données 2</label>
                            <textarea 
                                id="text_two" rows="4"
                                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                                {...register("text_two")} 
                            />
                        </div>
                    </div>

                    {/* URLs Médias */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-slate-950/20 rounded-2xl border border-slate-800/50">
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[11px] font-mono uppercase text-amber-500/60" htmlFor="image_url">Couverture Principale (URL)</label>
                            <input type="url" id="image_url" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none" {...register("image_url")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-500" htmlFor="github_url">GitHub</label>
                            <input type="url" id="github_url" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none" {...register("github_url")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase text-slate-500" htmlFor="demo_url">Demo Live</label>
                            <input type="url" id="demo_url" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none" {...register("demo_url")} />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[11px] font-mono uppercase text-slate-500" htmlFor="video_url">Vidéo (URL)</label>
                            <input type="url" id="video_url" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none" {...register("video_url")} />
                        </div>
                    </div>

                    {/* Galerie Secondaire */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase text-slate-500" htmlFor={`picture_${n}`}>Pic_{n}</label>
                                <input type="url" id={`picture_${n}`} className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10px] text-white focus:border-amber-500/50 focus:outline-none" {...register(`picture_${n}`)} />
                            </div>
                        ))}
                    </div>

                    {/* Bouton Save avec Glow conditionnel */}
                    <motion.button 
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        whileHover={isDirty ? { scale: 1.02, boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)" } : {}}
                        whileTap={isDirty ? { scale: 0.98 } : {}}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                            isDirty 
                            ? "bg-amber-500 text-slate-950 cursor-pointer" 
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        }`}
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Synchronisation..." : "Mettre à jour le Noyau"}
                    </motion.button>
                </form>

                {/* ASIDE PREVIEW (Sticky) */}
                <aside className="sticky top-8 flex flex-col gap-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md shadow-xl">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-4 mb-5">
                            <Eye className="w-4 h-4 text-amber-500" /> Visuel Temps Réel
                        </div>

                        {/* Preview Image */}
                        <div className="space-y-4">
                            <div className="group relative rounded-2xl overflow-hidden border border-slate-700 aspect-video bg-slate-950 shadow-2xl">
                                {imgPreview ? (
                                    <img src={imgPreview} alt="main" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700"><ImageIcon className="w-8 h-8" /></div>
                                )}
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-mono text-amber-500 border border-amber-500/30">PRIMARY_VIEW</div>
                            </div>

                            {/* Preview Vidéo */}
                            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video">
                                {vidPreview ? renderVideo(vidPreview) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-800"><Video className="w-8 h-8" /></div>
                                )}
                            </div>

                            {/* Mini Galerie Preview */}
                            <div className="grid grid-cols-4 gap-2">
                                {[pic1, pic2, pic3, pic4].map((p, idx) => (
                                    <div key={idx} className="aspect-square rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
                                        {p && <img src={p} alt="thumb" className="w-full h-full object-cover" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Status Card */}
                    <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl">
                        <h4 className="text-[10px] font-mono text-amber-500 uppercase mb-3">Logs_Système</h4>
                        <ul className="space-y-2 text-[9px] font-mono text-slate-400">
                            <li className="flex justify-between"><span>MODIFICATION_DETECTEE:</span> <span className={isDirty ? "text-amber-500" : "text-slate-600"}>{isDirty ? "OUI" : "NON"}</span></li>
                            <li className="flex justify-between"><span>CHAMPS_REQUIS:</span> <span className="text-emerald-500">VALIDE</span></li>
                            <li className="flex justify-between"><span>CONNEXION_BDD:</span> <span className="text-emerald-500">ETABLIE</span></li>
                        </ul>
                    </div>
                </aside>

            </div>
        </section>
    );
}

export default EditProject;