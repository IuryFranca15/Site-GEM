import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logoGemColored.png'
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

      <div className={styles.pesquisaContainer}>
        <input
          type="text"
          placeholder='Pesquisar'
          className={styles.inputPesquisa}
        />
        <button className={styles.pesquisaButton}>
          <FaSearch className={styles.pesquisaIcone} />
        </button>
      </div>

      <div className={styles.menuLinks}>
        <NavLink to='/' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Início</NavLink>
        <NavLink to='/sobre' className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }>Sobre</NavLink>
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
      </div>

    </nav>
  )
}

export default Navbar;