import ContactComponent from "../components/ContactComponents/ContactComponent.jsx"
import { motion } from "framer-motion"

function ContactPage() {
    return (
        <>
          <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
            <section className="flex justify-center p-10">
                <ContactComponent />
            </section>
            </motion.div>
        </>
    )
}

export default ContactPage