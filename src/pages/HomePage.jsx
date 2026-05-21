import RandomProjectCard from "../components/ProjectComponents/RandomProjectCard.jsx"
import RessaneComponent from "../components/HomeComponents/RessaneComponent.jsx"
import { motion } from "framer-motion"
import RessaneDescription from "../components/HomeComponents/RessaneDescription.jsx"

function HomePage() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

    >
      
      <section className="p-10 flex flex-col gap-10">
      <RessaneComponent />
      <RessaneDescription />
      <RandomProjectCard />
      </section>
      </motion.div>
    </>
    
  )
}
export default HomePage
