import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import LatestArticles from '../LatestArticles/LatestArticles';
import styles from './Publication.module.css'
import { FaSearch } from "react-icons/fa";

const MIN = 2000;
const MAX = 2025;

const Publications = () => {
  const [values, setValues] = useState([2010, 2020]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.filterSearch}>
            <div className={styles.containerSearch}>
              <input
                type="text"
                placeholder='Pesquisar'
                className={styles.searchInput}
              />
              <button className={styles.ButtonSearch}>
                <FaSearch className={styles.IconSearch} />
              </button>
            </div>
          </div>

          <div className={styles.filterSubgroups}>
            <h3 className={styles.titlesubgroups}>Subgrupos</h3>
            <div className={styles.divider}></div>
            <div className={styles.checkboxWrapper}>
              <input id='Clima-meio-ambiente' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Clima-meio-ambiente" className={styles.label}>Clima e meio ambiente</label>
            </div>

            <div className={styles.checkboxWrapper}>
              <input id='Energias-offshore' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Energias-offshore" className={styles.label}>Energias offshore</label>
            </div>

            <div className={styles.checkboxWrapper}>
              <input id='Pesca-agricultura' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Pesca-agricultura" className={styles.label}>Pesca e agricultura</label>
            </div>

            <div className={styles.checkboxWrapper}>
              <input id='Conceitos-metodos' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Conceitos-metodos" className={styles.label}>Conceitos e métodos</label>
            </div>
          </div>

          <div className={styles.filterNatureOfPublication}>
            <h3 className={styles.titlesubgroups}>Natureza da publicação</h3>
            <div className={styles.divider}></div>
            <div className={styles.checkboxWrapper}>
              <input id='Clima-meio-ambiente' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Clima-meio-ambiente" className={styles.label}>Livro</label>
            </div>

            <div className={styles.checkboxWrapper}>
              <input id='Energias-offshore' type="checkbox" className={styles.checkbox} />
              <label htmlFor="Energias-offshore" className={styles.label}>Policy Briefs</label>
            </div>
          </div>

          <div>
            <h3 className={styles.titlesubgroups}>Ano da publicação</h3>
            <div className={styles.divider}></div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div
                style={{
                  color: '#fff'
                }}>
                {values[0]} até {values[1]}
              </div>

              <Range
                step={1}
                min={MIN}
                max={MAX}
                values={values}
                onChange={setValues}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '6px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values,
                          colors: ['#ccc', '#0d9488', '#ccc'],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: 'center',
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
                      height: '16px',
                      width: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#00a896',
                      cursor: 'pointer',
                      boxShadow: '0 0 0 2px white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
              />
            </div>
          </div>

        </div>

        <div className={styles.wrapperPublications}>
          <LatestArticles />
        </div>
      </div>
    </div>
  )
}

export default Publications