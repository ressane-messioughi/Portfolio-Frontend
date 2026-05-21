import {
  ShieldCheck,
  FolderKanban,
  Mail,
  LayoutDashboard,
} from "lucide-react";

function DescribePanelComponent() {
  return (
    /* Utilisation d'un conteneur sémantique et d'une largeur maximale contrôlée */
    <section 
      className="mt-15 flex w-full max-w-xl flex-col gap-6 px-2" 
      aria-label="Fonctionnalités du panel d'administration"
    >
      
      {/* Ligne 1 : Tableau de bord */}
      <div className="flex items-start gap-4 group">
        <div className="h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-[#1A2740] flex items-center justify-center shadow-lg">
          <LayoutDashboard className="text-[#6EA8FF]" size={22} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-lg font-semibold md:text-xl">
              Tableau de bord administrateur
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-[#6EA8FF] to-transparent" aria-hidden="true"></div>
          </div>
          <p className="text-gray-300 mt-1 text-sm md:text-base leading-relaxed">
            Gérez l’ensemble du portfolio depuis une interface moderne et
            sécurisée. Ajoutez, modifiez ou supprimez facilement vos contenus.
          </p>
        </div>
      </div>

      {/* Ligne 2 : Gestion des projets */}
      <div className="flex items-start gap-4 group">
        <div className="h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-[#1A2740] flex items-center justify-center shadow-lg">
          <FolderKanban className="text-[#6EA8FF]" size={22} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-lg font-semibold md:text-xl">
              Gestion des projets
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-[#6EA8FF] to-transparent" aria-hidden="true"></div>
          </div>
          <p className="text-gray-300 mt-1 text-sm md:text-base leading-relaxed">
            Organisez vos projets, technologies, descriptions et médias depuis le
            panel d’administration en quelques clics.
          </p>
        </div>
      </div>

      {/* Ligne 3 : Gestion des messages */}
      <div className="flex items-start gap-4 group">
        <div className="h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-[#1A2740] flex items-center justify-center shadow-lg">
          <Mail className="text-[#6EA8FF]" size={22} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-lg font-semibold md:text-xl">
              Gestion des messages
            </h2>
            {/* CORRECTION : h-[1px] réparé ici */}
            <div className="h-px flex-1 bg-linear-to-r from-[#6EA8FF] to-transparent" aria-hidden="true"></div>
          </div>
          <p className="text-gray-300 mt-1 text-sm md:text-base leading-relaxed">
            Consultez les demandes de contact et centralisez les échanges reçus
            directement depuis votre espace administrateur.
          </p>
        </div>
      </div>

      {/* Ligne 4 : Sécurité */}
      <div className="flex items-start gap-4 group">
        <div className="h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-[#1A2740] flex items-center justify-center shadow-lg">
          <ShieldCheck className="text-[#6EA8FF]" size={22} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-lg font-semibold md:text-xl">
              Sécurité & accès
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-[#6EA8FF] to-transparent" aria-hidden="true"></div>
          </div>
          <p className="text-gray-300 mt-1 text-sm md:text-base leading-relaxed">
            Authentification sécurisée avec accès réservé à l’administrateur pour
            protéger les données et contenus du portfolio.
          </p>
        </div>
      </div>

    </section>
  );
}

export default DescribePanelComponent;