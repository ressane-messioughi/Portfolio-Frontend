import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Edit } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function DetailProject() {
  const { id } = useParams();
  const { apiFetch } = useFetch();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  // 🔥 NEW : zoom image state
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await apiFetch(`/project/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
        userInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center bg-[#111d30] text-white">
        <p className="animate-pulse text-xl font-medium">
          Chargement des détails du projet...
        </p>
      </div>
    );
  }
    async function handleDelete(id) {
            if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
            try {
                await apiFetch(`/project/${id}`, { method: "DELETE" });
                setProject((prev) => prev.filter((p) => p.id !== id));
                toast.success("Projet supprimé de la base de données");
                navigate("/admin");
            } catch (error) {
                toast.error("Erreur de protocole : Suppression échouée");
                console.error(error);
            }
        }

  if (!project) {
    return (
      <div className="flex h-96 items-center justify-center bg-[#111d30] text-white">
        <p className="text-xl font-medium text-red-400">Projet introuvable.</p>
      </div>
    );
     
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 bg-[#111d30] px-4 pb-10 md:px-0 rounded-xl border border-white/20 shadow-lg shadow-black/20">

      {/* HEADER */}
      <div className="flex flex-col items-center justify-around gap-6 rounded-xl border border-white/20 bg-gray-700/50 p-6 md:flex-row md:p-8 backdrop-blur-xs shadow-xl shadow-black/20">

        {project.image_url && (
          <img
            src={project.image_url}
            onClick={() => setZoomImg(project.image_url)}
            className="w-full max-w-md md:max-w-xl rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 hover:scale-[1.02] transition duration-300 cursor-pointer"
            alt={`Illustration principale du projet ${project.title}`}
          />
        )}

        <div className="flex flex-col items-center gap-6 text-center text-white md:w-6/12 md:items-start md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="text-base leading-relaxed text-gray-300 md:text-lg">
            {project.description}
          </p>

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl border border-white/20 bg-gray-700 px-6 py-3 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-white hover:text-black"
            >
              Voir la démo
            </a>
          )}
        </div>
      </div>
          {user?.role === "admin" && (
            <div className="flex flex-col fixed bottom-5 right-5 z-50 items-center gap-4 md:flex-row">
      <Link to={`/admin/project/${id}/edit`}><button className="w-fit p-2 bg-amber-500 rounded-xl  cursor-pointer hover:bg-amber-400 hover:scale-[1.03] transition duration-300"><Edit className="w-8 h-8 text-white" /></button></Link>
      <button className="w-fit  p-2 bg-red-500 rounded-xl cursor-pointer hover:bg-red-400 hover:scale-[1.03] transition duration-300" onClick={() => handleDelete(project.id)}><Trash className="w-8 h-8 text-white" /></button>
          
          </div>
          )}

      {/* SECTION 1 */}
      {project.text_one && (
        <>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">

            <p className="w-full rounded-xl bg-gray-700/40 p-6 text-base leading-relaxed text-gray-200 shadow-md md:w-7/12 sm:text-lg">
              {project.text_one}
            </p>

            {project.picture_1 && (
              <img
                src={project.picture_1}
                onClick={() => setZoomImg(project.picture_1)}
                className="w-full max-w-sm md:max-w-sm rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 hover:scale-[1.03] transition duration-300 cursor-pointer"
                alt={`Détail visuel 1 du projet ${project.title}`}
                loading="lazy"
              />
            )}

          </div>

          {(project.text_two || project.video_url) && (
            <div className="h-px w-full bg-white/10" />
          )}
        </>
      )}

      {/* SECTION 2 */}
      {project.text_two && (
        <>
          <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-around">

            {project.picture_2 && (
              <img
                src={project.picture_2}
                onClick={() => setZoomImg(project.picture_2)}
                className="w-full max-w-sm md:max-w-sm rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 hover:scale-[1.03] transition duration-300 cursor-pointer"
                alt={`Détail visuel 2 du projet ${project.title}`}
                loading="lazy"
              />
            )}

            <p className="w-full rounded-xl bg-gray-700/40 p-6 text-base leading-relaxed text-gray-200 shadow-md md:w-7/12 sm:text-lg">
              {project.text_two}
            </p>

          </div>

          {project.video_url && (
            <div className="h-px w-full bg-white/10" />
          )}
        </>
      )}

      {/* VIDEO */}
      {project.video_url && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Présentation Vidéo
          </h2>

          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-gray-700/30 p-2 shadow-lg aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full rounded-2xl p-1"
              src={project.video_url}
              title={`Vidéo de démonstration du projet ${project.title}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 🔥 ZOOM MODAL */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
      {(project.picture_3 || project.picture_4) && (
  <>
    <div className="h-px w-full bg-white/10" />

    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
      {project.picture_3 && (
        <img
          src={project.picture_3}
          onClick={() => setZoomImg(project.picture_3)}
          className="w-full max-w-sm rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 hover:scale-[1.03] transition duration-300 cursor-pointer"
          alt={`Détail visuel 3 du projet ${project.title}`}
          loading="lazy"
        />
      )}

      {project.picture_4 && (
        <img
          src={project.picture_4}
          onClick={() => setZoomImg(project.picture_4)}
          className="w-full max-w-xs rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 hover:scale-[1.03] transition duration-300 cursor-pointer"
          alt={`Détail visuel 4 du projet ${project.title}`}
          loading="lazy"
        />
      )}
    </div>
  </>
)}
      

    </section>
  );
}

export default DetailProject; 