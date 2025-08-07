import { useState, useRef, useEffect } from "react";
import styles from "./DropdownCheckboxNature.module.css";

const DropdownCheckboxNature = ({ allTypes, selectedTypes, toggleType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedText =
    selectedTypes.length === 0
      ? "Selecione"
      : selectedTypes.length === 1
        ? selectedTypes[0]
        : `${selectedTypes.length} selecionados`;

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div className={styles.containerTitle}>
        <h3 className={styles.titlesubgroups}>Natureza da publicação</h3>
        <div className={styles.divider}></div>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownButton}
      >
        <span className={styles.selectedText} >{selectedText}</span>
        <span
          className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`${styles.dropdownMenu} ${isOpen ? styles.open : styles.closed
          }`}
      >
        {allTypes.map((type) => (
          <label key={type} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckboxNature;
