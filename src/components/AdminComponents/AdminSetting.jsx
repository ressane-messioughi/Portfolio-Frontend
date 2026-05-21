import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { SquarePen, Trash, CirclePlus, LayoutDashboard, ChevronRight, Calendar, Code2, Info } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function AdminSetting() {
    const { apiFetch } = useFetch();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // État pour savoir quel projet est ouvert (un seul à la fois pour le focus)
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchProjectData() {
            try {
                const response = await apiFetch("/project", { method: "GET" });
                const result = await response.json();
                if (isMounted) {
                    setProjects(result);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) setIsLoading(false);
            }
        }
        fetchProjectData();
        return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Fonction pour basculer l'affichage des détails d'un projet (A COMPRENDRE AVEC LE CODE DE DETAILPROJECT.JSX)
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    async function handleDelete(id) {
        if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
        try {
            await apiFetch(`/project/${id}`, { method: "DELETE" });
            setProjects((prev) => prev.filter((p) => p.id !== id));
            toast.success("Projet supprimé de la base de données");
        } catch (error) {
            toast.error("Erreur de protocole : Suppression échouée");
            console.error(error);
        }
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8 font-sans text-slate-200">
            {/* Header avec effet Glassmorphism futuriste */}
            <header className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-6 mb-12">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-5 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-2xl relative group"
                >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-cyan-500 to-blue-600 rounded-l-3xl shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                        <LayoutDashboard className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
                            Ressane Portfolio <span className="text-cyan-500 font-mono text-sm">v1.0</span>
                        </h1>
                        <p className="text-slate-500 text-xs font-mono mt-1 uppercase tracking-widest">Connexion à la base de donnée ✅</p>
                    </div>
                </motion.div>

                <Link to="/admin/project/new">
                    <motion.div
                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl border border-emerald-300/30 transition-all cursor-pointer uppercase tracking-tighter"
                    >
                        Nouveau Projet <CirclePlus className="w-6 h-6" />
                    </motion.div>
                </Link>
            </header>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            ) : (
                <ul className="grid gap-5">
                    <AnimatePresence mode="popLayout">
                        {projects.map((project) => (
                            <motion.li
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                                className="overflow-hidden bg-slate-900/30 border border-slate-800 rounded-3xl transition-all duration-500 hover:border-slate-600 shadow-lg"
                            >
                                {/* Ligne Principale */}
                                <div className="flex items-center gap-2 sm:gap-4 p-4 md:p-6 cursor-pointer select-none" onClick={() => toggleExpand(project.id)}>
                                    {/* Trigger Flèche */}
                                    <motion.div
                                        animate={{ rotate: expandedId === project.id ? 90 : 0 }}
                                        className="p-2 rounded-full bg-slate-800 text-slate-400"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.div>

                                    {/* Image Thumbnail */}
                                    <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0 shadow-inner">
                                        <img src={project.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="" />
                                    </div>

                                    {/* Titre & ID rapide */}
                                    <div className="grow">
                                        <h2 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400">
                                            {project.title}
                                        </h2>
                                        <span className="text-[10px] font-mono text-slate-600">ID: {String(project.id).slice(0, 8)}...</span>
                                    </div>

                                    {/* Actions rapides */}
                                    <div className="flex flex-col sm:flex-row gap-2" onClick={(e) => e.stopPropagation()}>
                                        <Link to={`/admin/project/${project.id}/edit`}>
                                            <button className="cursor-pointer p-3 rounded-2xl bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
                                                <SquarePen className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(project.id)}
                                            className="cursor-pointer p-3 rounded-2xl bg-slate-800 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Accordéon de Détails */}
                                <AnimatePresence>
                                    {expandedId === project.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="border-t border-slate-800/50 bg-slate-950/40"
                                        >
                                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {/* Description Section */}
                                                <div className="flex gap-4 col-span-1 md:col-span-1">
                                                    <Info className="w-5 h-5 text-cyan-500 shrink-0" />
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-widest font-mono text-slate-500 mb-2">Description</h4>
                                                        <p className="text-sm leading-relaxed text-slate-300 italic">
                                                            {project.description || "Aucune documentation disponible pour ce module."}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Technologies Badges */}
                                                <div className="flex gap-4">
                                                    <Code2 className="w-5 h-5 text-purple-500 shrink-0" />
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-widest font-mono text-slate-500 mb-2">Stack Technique</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {/* On simule des technos si elles ne sont pas dans ton DB */}
                                                            {(project.technologies || ["React", "Tailwind", "Node.js"]).map((tech, idx) => (
                                                                <span key={idx} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold uppercase text-slate-400">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Date & Meta */}
                                                <div className="flex gap-4">
                                                    <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-widest font-mono text-slate-500 mb-2">Déploiement</h4>
                                                        <time className="text-sm font-mono text-emerald-400/80">
                                                            {project.created_at ? new Date(project.created_at).toLocaleDateString() : "01.05.2024"}
                                                        </time>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </section>
    );
}

export default AdminSetting;