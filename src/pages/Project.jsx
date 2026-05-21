import AllProjectCard from "../components/ProjectComponents/AllProjectCard.jsx"
import { motion } from "framer-motion"

function Project() {
    return (
        <>
          <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <section className="p-10">
            <AllProjectCard />
        </section>
            </motion.div>
        </>
    )
}

export default Project