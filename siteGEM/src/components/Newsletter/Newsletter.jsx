import styles from './Newsletter.module.css'

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Assine nossa newsletter</h2>
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