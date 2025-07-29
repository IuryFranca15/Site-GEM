import styles from "./CardsGrid.module.css";

const CardsGrid = ({ data }) => {
  if (!data.length) return <p className={styles.titleNotFound}>Nenhuma publicação encontrada.</p>;

  return (
    <div className={styles.grid}>
      {data.map(({ id, title, group, type, year, image }) => (
        <div key={id} className={styles.card}>
          {image && (
            <img
              src={image}
              alt={title}
              className={styles.cardImage}
            />
          )}
          <h4>{title}</h4>
          <p>
            <strong>Grupo:</strong> {group}
          </p>
          <p>
            <strong>Tipo:</strong> {type}
          </p>
          <p>
            <strong>Ano:</strong> {year}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardsGrid;
