import AddProject from "../components/AdminComponents/AddProject"
import { motion } from "framer-motion"
function AddProjectPage() {
  return (
    <>
       <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

    >
      <section className="p-10">
        <AddProject/>
      </section>
    </motion.div>
    </>

  )
}

export default AddProjectPage