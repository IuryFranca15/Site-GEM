import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import styles from "./PostFilters.module.css";
import DropdownCheckbox from "../SubgrupoFilter/DropdownCheckbox ";
import DropdownCheckboxNature from "../NatureOfPublicationFilter/DropdownCheckboxNature ";

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
  allTypes = ["Livro", "Policy Brief", "Relatórios", "Artigo", "Notícia"],
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
      {/* <div className={styles.filtersGroup}>
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
      </div> */}
      <DropdownCheckbox
        allGroups={allGroups}
        selectedGroups={selectedGroups}
        toggleGroup={toggleGroup}
      />

      {/* Filtro Natureza da publicação */}
      <DropdownCheckboxNature
        allTypes={allTypes}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
      />

      {/* Filtro Ano */}
      <div className={styles.filtersGroup}>
        <div className={styles.containerTitle}>
          <h3 className={styles.titlesubgroups}>Ano da publicação</h3>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.wrapper}>
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
                className={styles.trackWrapper}
              >
                <div
                  ref={props.ref}
                  className={styles.track}
                  style={{
                    background: getTrackBackground({
                      values: rangeValues,
                      colors: ['#ccc', '#00a896', '#ccc'],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className={styles.thumb} />
            )}
          />
          <div className={styles.rangeValue}>
            {rangeValues[0]} - {rangeValues[1]}
          </div>
        </div>
      </div>
    </aside >
  );
};

export default PostFilters;


