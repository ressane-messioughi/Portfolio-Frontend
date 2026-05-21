import LoginComponent from '../components/LoginComponents/LoginComponent'
import { motion } from "framer-motion"
import DescribePanelComponent from '../components/LoginComponents/DescribePanelComponent'

export default function LoginPage() {
    return (
        <>
        <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
  <div className="w-full min-h-[calc(100vh-80px)] bg-[#111d30] flex flex-col items-center justify-center gap-8 px-4 py-10 lg:flex-row lg:gap-16">
      
      {/* Bloc de Gauche : Description des fonctionnalités */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <DescribePanelComponent />
      </div>

      {/* Bloc de Droite : Formulaire de connexion */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <LoginComponent />
      </div>

    </div>
        </motion.div>
        </>
    )
}
