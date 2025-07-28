import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logoGemColored.png'
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isSobreOpen, setSobreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Função para abrir dropdown
  const openSobre = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setSobreOpen(true)
  }

  // Função para fechar dropdown com delay
  const closeSobre = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setSobreOpen(false)
    }, 150) // Pequeno delay para permitir transição suave
  }

  // Toggle para clique (acessibilidade e touch)
  const toggleSobre = () => {
    setSobreOpen(prev => !prev)
  }

  const [mostrarInput, setMostrarInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (mostrarInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mostrarInput]);

  // Cleanup do timeout
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])


  return (
    <nav className={`${styles.menu} ${scrolled ? styles.menuScrolled : ''}`}>
      <div className={styles.logoContainer}>
        <NavLink to='/'>
          <img
            src={logo}
            alt="logo do site"
            className={styles.logoImg}
          />
        </NavLink>
      </div>

      <div className={styles.menuLinks}>
        <NavLink to='/' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Início</NavLink>
        <li
          className={styles.menuItem}
          ref={dropdownRef}
          onMouseEnter={openSobre}
          onMouseLeave={closeSobre}
        >
          <button
            onClick={toggleSobre}
            className={`${styles.link} ${styles.dropdownButton}`}
            aria-expanded={isSobreOpen}
            aria-haspopup="true"
          >
            Sobre
            <span className={`${styles.dropdownArrow} ${isSobreOpen ? styles.dropdownArrowOpen : ''}`}>
              ▼
            </span>
          </button>
          <div className={`${styles.dropdownOverlay} ${isSobreOpen ? styles.dropdownOverlayOpen : ''}`}>
            <ul className={`${styles.dropdownMenu} ${isSobreOpen ? styles.dropdownMenuOpen : ''}`}>
              <li className={styles.dropdownItem}>
                <NavLink
                  to='/missao-valores'
                  className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setSobreOpen(false)}
                >
                  Missão e Valores
                </NavLink>
              </li>

              <li className={styles.dropdownItem}>
                <NavLink
                  to='/historia'
                  className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setSobreOpen(false)}
                >
                  História
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <NavLink to='/equipe' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Equipe</NavLink>
        <NavLink to='/subgrupos' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Subgrupos</NavLink>
        <NavLink to='/publicacoes' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Publicações</NavLink>
        <NavLink to='/contato' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Contato</NavLink>

        <div className={styles.pesquisaContainer}>
          <input
            type="text"
            placeholder="Pesquisar"
            className={`${styles.inputPesquisa} ${mostrarInput ? styles.ativo : ''}`}
            ref={inputRef}
          />
          <button
            className={styles.pesquisaButton}
            onClick={() => setMostrarInput(prev => !prev)}
            aria-label="Pesquisar"
          >
            <FaSearch className={styles.pesquisaIcone} />
          </button>
        </div>
      </div>

    </nav>
  )
}

export default Navbar;