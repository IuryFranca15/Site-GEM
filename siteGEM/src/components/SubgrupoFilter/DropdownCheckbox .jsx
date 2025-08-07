import { useState, useRef, useEffect } from "react";
import styles from "./DropdownCheckbox.module.css";

const DropdownCheckbox = ({ allGroups, selectedGroups, toggleGroup }) => {
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
    selectedGroups.length === 0
      ? "Selecionar subgrupos"
      : selectedGroups.length === 1
        ? selectedGroups[0]
        : `${selectedGroups.length} selecionados`;

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div className={styles.containerTitle}>
        <h3 className={styles.titlesubgroups}>Subgrupos</h3>
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
        {allGroups.map((group) => (
          <label key={group} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={selectedGroups.includes(group)}
              onChange={() => toggleGroup(group)}
            />
            <span>{group}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckbox;
