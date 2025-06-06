import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        <Link to='/'>
          <img
            src={logo}
            alt="logo do site"
            className={styles.logoImg}
          />
        </Link>
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
        <Link to='/'>Início</Link>
        <Link to='/sobre'>Sobre</Link>
        <Link to='/equipe'>Equipe</Link>
        <Link to='/subgrupos'>Subgrupos</Link>
        <Link to='/publicacoes'>Publicações</Link>
        <Link to='/contato'>Contato</Link>
      </div>

    </nav>
  )
}

export default Navbar;