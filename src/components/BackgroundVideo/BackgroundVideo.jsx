import styles from './BackgroundVideo.module.css'

const BackgroundVideo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          id="mbYTP_bgndVideo"
          className={styles.iframe}
          frameBorder="0"
          allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="Website Header Video 2020"
          src="https://www.youtube.com/embed/ctLjaVUXyLk?modestbranding=1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&enablejsapi=1&loop=1&playlist=ctLjaVUXyLk"
        ></iframe>
      </div>

      <div className={styles.overlay}>
        <span>Somos o</span>
        <h1 className={styles.heading}>
          Grupo Economia do Mar
        </h1>
        <p>O primeiro grupo de pesquisa brasileiro dedicado ao estudo<br /> da economia marinha e seus impactos socioeconômicos e ambientais.</p>

        <div className={styles.buttons}>
          <a
            href="/sobre"
            className={styles.button}
          >
            Conheça nosso trabalho
          </a>

          <a
            href="/contato"
            className={styles.button}
          >
            Entre em contato
          </a>
        </div>
      </div>
    </div >
  )
}

export default BackgroundVideo