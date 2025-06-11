import Styles from './Team.module.css'

const Team = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <div className={Styles.contentTitle}>
          <h2 className={Styles.title}>Conheça nossa equipe</h2>
          <div className={Styles.divider}></div>
        </div>
      </div>
    </div>
  )
}

export default Team