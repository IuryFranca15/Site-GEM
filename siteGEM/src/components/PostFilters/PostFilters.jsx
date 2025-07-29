import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import styles from "./PostFilters.module.css";

const MIN = 1990;
const MAX = new Date().getFullYear();

const PostFilters = ({
  onFilterChange = () => { },
  allGroups = [
    "Blue Finance",
    "Clima e meio ambiente",
    "Conceitos e métodos",
    "Construção e reparação naval",
    "Defesa e segurança",
    "Energias offshore",
    "Minerais offshore",
    "Pesca e aquicultura",
    "Relações geopolíticas",
    "Relações sociais",
    "Transporte e infraestrutura",
    "Turismo, esporte e lazer",
  ],
  allTypes = ["Livro", "Policy Brief", "Relatório", "Artigo", "Notícia"],
}) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rangeValues, setRangeValues] = useState([MIN, MAX]);

  useEffect(() => {
    onFilterChange({
      groups: selectedGroups,
      types: selectedTypes,
      search: searchTerm,
      yearRange: rangeValues,
    });
  }, [selectedGroups, selectedTypes, searchTerm, rangeValues]);

  const toggleGroup = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <aside className={styles.filters}>
      {/* Busca */}
      <div className={styles.containerSearch}>
        <input
          type="text"
          placeholder="Pesquisar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.ButtonSearch}>🔍</button>
      </div>

      {/* Filtro Subgrupos */}
      <div className={styles.filtersGroup}>
        <div className={styles.containerTitle}>
          <h3 className={styles.titlesubgroups}>Subgrupos</h3>
          <div className={styles.divider}></div>
        </div>

        {allGroups.map((group) => (
          <div key={group} className={styles.checkboxWrapper}>
            <input
              id={`group-${group}`}
              type="checkbox"
              className={styles.checkbox}
              checked={selectedGroups.includes(group)}
              onChange={() => toggleGroup(group)}
            />
            <label htmlFor={`group-${group}`} className={styles.label}>
              {group}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro Natureza da publicação */}
      <div className={styles.filtersGroup}>
        <div className={styles.containerTitle}>
          <h3 className={styles.titlesubgroups}>Natureza da publicação</h3>
          <div className={styles.divider}></div>
        </div>

        {allTypes.map((type) => (
          <div key={type} className={styles.checkboxWrapper}>
            <input
              id={`type-${type}`}
              type="checkbox"
              className={styles.checkbox}
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            <label htmlFor={`type-${type}`} className={styles.label}>
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro Ano */}
      <div className={styles.filtersGroup}>
        <div className={styles.containerTitle}>
          <h3 className={styles.titlesubgroups}>Ano da publicação</h3>
          <div className={styles.divider}></div>
        </div>

        <div style={{ padding: "0 0.5rem" }}>
          <Range
            step={1}
            min={MIN}
            max={MAX}
            values={rangeValues}
            onChange={setRangeValues}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: 36,
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: 6,
                    width: "100%",
                    borderRadius: 4,
                    background: getTrackBackground({
                      values: rangeValues,
                      colors: ["#ccc", "#00a896", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  backgroundColor: "#00a896",
                  cursor: "pointer",
                  boxShadow: "0 0 0 2px white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            )}
          />
          <div
            style={{
              color: "#fff",
              marginTop: 10,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {rangeValues[0]} - {rangeValues[1]}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PostFilters;


