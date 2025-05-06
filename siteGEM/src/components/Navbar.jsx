import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-gem.png'
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";

const Navbar = () => { 

  return (
    <nav className={styles.menu}>
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
            <Link to='/'>Página Inicial</Link>
            <Link to='#'>Publicações</Link>
            <Link to='#'>Equipe</Link>
            <Link to='#'>Subgrupos</Link>
      </div>

    </nav>
  )
}

export default Navbar;