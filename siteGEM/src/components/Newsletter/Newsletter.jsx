import styles from './Newsletter.module.css'
import { motion } from "framer-motion";


const Newsletter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          Assine nossa newsletter
        </motion.h2>
        <p className={styles.text}>
          Ficar por dentro do futuro da economia nunca foi tão simples! Aprenda mais e mantenha-se atualizado(a) sobre Economia do Mar e Governança do Oceano através de publicações mensais elaboradas por uma equipe altamente especializada nos temas em questão.
        </p>
        <div className={styles.contact}>
          <input
            type="email"
            placeholder='Seu E-mail'
            aria-label="Digite seu e-mail para assinar"
            className={styles.input} />
          <button className={styles.button}>Inscreva-se</button>
        </div>

      </div>

    </div>
  )
}

export default Newsletter