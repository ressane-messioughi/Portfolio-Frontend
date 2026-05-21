import EditProject from "../components/AdminComponents/EditProject"
import { motion } from "framer-motion"
function EditProjectPage() {
  return (
   <> 
   <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <EditProject />
    </motion.div>
   </>
  )
}

export default EditProjectPage