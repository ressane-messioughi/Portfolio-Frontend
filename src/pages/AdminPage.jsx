import AdminSetting from "../components/AdminComponents/AdminSetting"
import { motion } from "framer-motion"

function AdminPage() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="p-10">
    <AdminSetting/>
      </section>
      </motion.div>
    </>
  )
}

export default AdminPage