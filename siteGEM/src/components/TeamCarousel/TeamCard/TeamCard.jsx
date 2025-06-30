import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import styles from "./TeamCard.module.css";

const TeamCard = ({ name, role, bio, image, instagram, linkedln }) => {
  return (

    <div className={styles.cards}>
      <Link className={styles.link}>
        <article className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img
              src={image}
              alt={name}
              loading="lazy"
              className={styles.cardImage}
            />

          </div>

          <div className={styles.cardContent}>
            <div>
              <h2 className={styles.name}>{name}</h2>
              <span className={styles.role}>{role}</span>
            </div>
            <div>
              <p className={styles.bio}>{bio}</p>
            </div>
            <div className={styles.social}>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram de ${name}`}
                >
                  <FaInstagram className={styles.icon} />
                </a>
              )}
              {linkedln && (
                <a
                  href={linkedln}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${name}`}
                >
                  <FaLinkedin className={styles.icon} />
                </a>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default TeamCard;
