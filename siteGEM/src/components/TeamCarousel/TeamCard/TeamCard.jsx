import { Link } from 'react-router-dom';
import styles from "./TeamCard.module.css";


const TeamCard = ({ name, role, image, bg, icon }) => {
  return (

    <div className={styles.cards}>
      <Link className={styles.link}>
        <div className={`${styles.card} card`}>
          <div className={styles.imageWrapper}>
            <img
              src={bg}
              alt="Imagem que representa o subgrupo"
              className={styles.bgImage}
            />
            <div className={styles.overlay}></div>
          </div>

          <div className={styles.contentInformation}>
            <img
              src={image}
              alt="Imagem da pessoa"
              className={styles.memberImage}
            />
            <h3>{name}</h3>
            <p>{role}</p>
            <img
              src={icon}
              alt=""
              className={styles.icon}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamCard;
