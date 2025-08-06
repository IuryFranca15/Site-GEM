import { Link } from "react-router-dom";
import styles from "./CardsGrid.module.css";



const CardsGrid = ({ data }) => {
  if (!data.length) return <p className={styles.titleNotFound}>Nenhuma publicação encontrada.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {data.map(({ id, title, image, author }) => (
          <Link>
            <div key={id} className={styles.card}>
              <div className={styles.imageContainer}>
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.overlay}>
                  <h2>{title}</h2>
                  <h3>Por {author}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
};

export default CardsGrid;
