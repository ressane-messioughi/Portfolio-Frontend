import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-portfolio.png";
import { MonitorCog, LogOut } from "lucide-react";

function Header() {
    const { userInfo, user, isLoggedIn, logout } = useContext(AuthContext);

    useEffect(() => {
        userInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        /* Changement de balise : section -> header */
        <header className="w-full border-b border-white/20 bg-[#111d30]/90 p-4 backdrop-blur-md sticky top-0 z-50">
            {/* Conteneur fluide max-w-6xl aligné avec le reste de ton site */}
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                
                {/* LOGO (Parfaitement centré sur mobile, aligné à gauche sur desktop) */}
                <div className="flex justify-center sm:justify-start shrink-0">
                    <Link to="/" aria-label="Retour à l'accueil">
                        <img src={Logo} className="h-20 w-auto object-contain" alt="Logo Portfolio" />
                    </Link>
                </div>

                {/* NAVIGATION PRINCIPALE */}
                <nav className="flex items-center justify-center rounded-full border border-white/20 bg-gray-700/80 p-1.5 backdrop-blur-xl shadow-md">
                    <ul className="flex items-center gap-1 text-sm font-bold text-white">
                        <li>
                            <Link to="/" className="block rounded-full px-3 py-1.5 transition duration-300 hover:bg-white hover:text-black">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="block rounded-full px-3 py-1.5 transition duration-300 hover:bg-white hover:text-black">
                                Projets
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block rounded-full px-3 py-1.5 transition duration-300 hover:bg-white hover:text-black">
                                Contact
                            </Link>
                        </li>
                        {/* Si l'utilisateur n'est pas connecté, on rajoute Connexion à la suite */}
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login" className="block rounded-full px-3 py-1.5 transition duration-300 hover:bg-white hover:text-black bg-white/10">
                                    Connexion
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* ZONE UTILISATEUR CONNECTÉ */}
                {isLoggedIn && (
                    <div className="flex items-center justify-center gap-3 rounded-full border border-green-600 bg-gray-700/90 p-1.5 pl-3 text-sm text-white shadow-md sm:justify-end">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3781/3781986.png" 
                            className="h-8 w-8 rounded-full bg-white/10 object-cover" 
                            alt="" /* Décoratif car le prénom suit */
                        />
                        <span className="font-medium hidden md:inline">Bienvenue, {user?.firstname || ""}</span>
                        
                        {/* Actions boutons */}
                        <div className="flex gap-1.5">
                            {user?.role === "admin" && (
                                <Link to="/admin" aria-label="Accéder au panneau d'administration">
                                    <button 
                                        type="button" 
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition duration-300 hover:bg-amber-500 hover:text-white cursor-pointer"
                                        title="Administration"
                                    >
                                        <MonitorCog className="size-4" />
                                    </button>
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition duration-300 hover:bg-red-500 hover:text-white cursor-pointer"
                                aria-label="Se déconnecter de votre compte"
                                title="Déconnexion"
                            >
                                <LogOut className="size-4" />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </header>
    );
}

export default Header;