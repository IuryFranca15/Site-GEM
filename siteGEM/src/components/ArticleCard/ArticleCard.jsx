import PropTypes from 'prop-types';
import styles from "./ArticleCard.module.css";

const ArticleCard = ({ image, title, text = "", className = "" }) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ backgroundImage: `url(${image})` }}
      role="img"
      aria-label={title}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.string,
};

export default ArticleCard;