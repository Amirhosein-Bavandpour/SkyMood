import { motion } from "framer-motion";
import { pageAnimation } from "../utils/animations";

function About({ t }) {
  return (
    <motion.div
      className="page"
      variants={pageAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <section className="container about-page">
        <h1>{t.aboutTitle}</h1>

        <p>{t.aboutTextOne}</p>

        <p>{t.aboutTextTwo}</p>
      </section>
    </motion.div>
  );
}

export default About;
