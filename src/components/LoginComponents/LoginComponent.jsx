import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-portfolio.png";
import { Cog, TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  const { loginAuth } = useContext(AuthContext);
  const [apiError, setApiError] = useState("");

  const handleSubmitForm = async (data) => {
    setApiError(""); // Réinitialise l'erreur à chaque tentative
    
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        loginAuth(result.token);
        toast.success("Connexion réussie !", { theme: "dark" });
        navigate("/");
      } else {
        // Capture l'erreur renvoyée par ton Express (ex: "Mot de passe incorrect")
        setApiError(result.message || "Identifiants invalides.");
        toast.error(result.message || "Identifiants invalides.");
      }
    } catch (err) {
      console.error(err);
      setApiError("Une erreur réseau est survenue.");
    }
  };

  return (
    <div className="flex w-full justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full max-w-sm flex-col gap-5 rounded-xl border-2 border-white/20 bg-gray-700/60 p-6 shadow-xl shadow-black/40 backdrop-blur-md"
      >
        {/* EN-TÊTE DU FORMULAIRE */}
        <div className="flex flex-col gap-3 items-center justify-center text-center">
          <img 
            src={Logo} 
            className="h-20 w-auto bg-[#111d30fb] rounded-xl border border-white/20 p-2 object-contain" 
            alt="Logo Portfolio" 
          />
          <h1 className="text-[#fdfeff] flex items-center gap-2 text-xl font-bold">
            Panel de gestion <Cog className="size-5 animate-[spin_4s_linear_infinite]" />
          </h1>
        </div>

        {/* AFFICHAGE DES ERREURS SERVEUR EXPRESS */}
        {apiError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
            <TriangleAlert className="size-4 shrink-0" />
            <p>{apiError}</p>
          </div>
        )}

        {/* CHAMP : EMAIL */}
        <div className="flex flex-col gap-2">
          <label 
            className="text-white font-bold bg-[#111d30fb] border border-white/10 rounded-xl px-3 py-1.5 text-sm w-fit" 
            htmlFor="email"
          >
            Email :
          </label>
          <input
            className="bg-white rounded-full p-3 text-black text-sm focus:outline focus:outline-offset-2 focus:outline-blue-500"
            id="email"
            type="email" /* Changement de type */
            placeholder="votre@email.com"
            autoComplete="email" /* Autocomplete */
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Email obligatoire.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email invalide.",
              },
            })}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 flex items-center gap-1.5 text-xs font-semibold px-2">
              • {errors.email.message}
            </p>
          )}
        </div>

        {/* CHAMP : MOT DE PAUSE */}
        <div className="flex flex-col gap-2">
          <label 
            className="text-white font-bold bg-[#111d30fb] border border-white/10 rounded-xl px-3 py-1.5 text-sm w-fit" 
            htmlFor="password"
          >
            Mot de passe :
          </label>
          <input
            className="bg-white rounded-full p-3 text-black text-sm focus:outline  focus:outline-offset-2 focus:outline-blue-500"
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password" /* Autocomplete */
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password", {
              required: "Mot de passe obligatoire.",
            })}
          />
          {errors.password && (
            <p id="password-error" className="text-red-400 flex items-center gap-1.5 text-xs font-semibold px-2">
              • {errors.password.message}
            </p>
          )}
        </div>

        {/* BOUTON SOUFFRIR */}
        <button
          type="submit"
          className="mt-2 p-3.5 bg-[#111d30fb] w-full sm:w-fit mx-auto text-white text-md font-bold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;