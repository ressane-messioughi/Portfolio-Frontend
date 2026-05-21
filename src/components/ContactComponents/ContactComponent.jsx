import { useFetch } from "../../hooks/useFetch.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactImage from "../../assets/ressane-contact.png";

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const { apiFetch } = useFetch();

  const handleSubmitForm = async (data) => {
    
      const response = await apiFetch('/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("E-mail envoyé avec succès !", {
          theme: "dark",
          className: "border border-blue-500",
          progressClassName: "bg-blue-400",
        });
        navigate("/");
      } else {
        toast.error(result || "Une erreur est survenue lors de l'envoi.");
      }
    
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 md:px-0" aria-labelledby="contact-title">
      {/* Titre Principal Sémantique */}
      <h1 id="contact-title" className="w-fit rounded-xl border border-black bg-[#111d30] p-5 text-2xl font-bold text-white shadow-lg shadow-black/40 sm:text-3xl md:text-4xl">
        Formulaire de contact :
      </h1>

      {/* Box principale : Colonne sur mobile, Ligne sur Desktop grand écran */}
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-xl border border-black bg-[#111d30] p-6 shadow-lg shadow-black/40 gap-8 md:p-10">
        
        {/* SECTION INFOS & ILLUSTRATION */}
        <div className="flex flex-col gap-5 items-center text-center lg:text-left lg:items-center lg:w-5/12">
          <img 
            src={ContactImage} 
            className="mx-auto lg:mx-0 w-64 p-2 bg-gray-700 border border-white/25 rounded-xl object-contain shadow-inner" 
            alt="Illustration de contact de Ressane" 
            loading="lazy"
          />
          <h2 className="text-xl md:text-2xl text-white font-bold">
            Vous avez un projet ? N'hésitez pas à me contacter !
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Que ce soit pour une demande de réalisation de site web, d'application mobile, ou toute autre question, je suis à votre écoute. Remplissez le formulaire ci-contre et je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        {/* LIGNE DE SÉPARATION (Masquée sur mobile, visible dès l'écran large) */}
        <div className="hidden lg:block w-px h-80 bg-white/20 self-center"></div>
          
        {/* FORMULAIRE DE CONTACT */}
        <form 
          className="flex w-full lg:w-6/12 flex-col gap-4 bg-gray-700/60 backdrop-blur-md rounded-xl p-5 border-2 border-white/20 shadow-inner" 
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          {/* CHAMP : SUJET */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold bg-[#111d30] border border-white/20 rounded-xl px-3 py-1.5 text-sm w-fit" htmlFor="subject">
              Sujet :
            </label>  
            <input 
              type="text" 
              id="subject" 
              className="bg-white rounded-xl p-3 text-black focus:outline focus:outline-offset-2 focus:outline-blue-500"
              placeholder="Ex : Demande de réalisation de site web"
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              {...register("subject", { required: "Sujet obligatoire." })} 
            />
            {errors.subject && (
              <p id="subject-error" className="text-red-400 flex items-center gap-2 bg-[#111d30fb] border border-red-500/30 rounded-xl p-2 text-sm">
                <TriangleAlert className="size-4 shrink-0" />
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* CHAMP : MESSAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold bg-[#111d30] border border-white/20 rounded-xl px-3 py-1.5 text-sm w-fit" htmlFor="text">
              Message :
            </label>
            <textarea 
              id="text" 
              className="bg-white h-40 p-3 rounded-xl text-black focus:outline focus:outline-offset-2 focus:outline-blue-500" 
              placeholder="Votre message détaillé..."
              aria-invalid={errors.text ? "true" : "false"}
              aria-describedby={errors.text ? "text-error" : undefined}
              {...register("text", { required: "Message obligatoire." })}
            />
            {errors.text && (
              <p id="text-error" className="text-red-400 flex items-center gap-2 bg-[#111d30fb] border border-red-500/30 rounded-xl p-2 text-sm">
                <TriangleAlert className="size-4 shrink-0" />
                {errors.text.message}
              </p>
            )}
          </div>

          {/* BOUTON ENVOI */}
          <button 
            type="submit" 
            className="mt-2 px-6 py-3 bg-[#111d30] w-full sm:w-fit mx-auto text-white text-md font-bold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            Envoyer le message
          </button>
        </form>

      </div>
    </section>
  );
}

export default ContactPage;