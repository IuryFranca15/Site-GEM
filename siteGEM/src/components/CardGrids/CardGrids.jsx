import React from "react";

const CardsGrid = ({ data }) => {
  if (!data.length) return <p>Nenhuma publicação encontrada.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        padding: 16,
      }}
    >
      {data.map(({ id, title, group, type, year, image }) => (
        <div
          key={id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            backgroundColor: "#fafafa",
          }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              style={{ width: "100%", borderRadius: 8, marginBottom: 12 }}
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
