import { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoGemColored.png'
import Styles from './Footer.module.css'
import LoginPopup from '../LoginPopup/LoginPopup'

const Footer = () => {

  const year = new Date().getFullYear();

  const [showLogin, setShowLogin] = useState(false);

  return (

    <>
    <div className={`${Styles.pageWrapper} ${showLogin ? Styles.blurred : ''}`}>
    <footer className={Styles.footer}>
    <div className={Styles.footerTop}>
        <div className={Styles.footerMain}>
          <div className={Styles.footerLeft}>
            <img src={logo} alt="Logo GEM" className={Styles.footerLogoImg} />
            <div className={Styles.footerDescription}>
              <h1>Grupo Economia do Mar</h1>
              <p>
                O primeiro grupo de pesquisa brasileiro dedicado ao estudo da <br />
                economia marinha e seus impactos socioeconômicos e <br />
                ambientais.
              </p>
            </div>
          </div>

          <div className={Styles.footerLinksWrapper}>
            <div className={Styles.footerLinks}>

            <div className={Styles.footerColumn}>
              <div className={Styles.footerLinked}>
                <h3><Link to="/">Início</Link></h3>
                <h3><Link to="/equipe">Equipe</Link></h3>
                <h3><Link to="/subgrupos">Subgrupos</Link></h3>
              </div>
            </div>

              <div className={Styles.footerColumn}>
                <h3>Sobre nós</h3>
                <Link to="/">Missão e Valores</Link>
                <Link to="/">O que é o GEM</Link>
                <Link to="/">História</Link>
              </div>

              <div className={Styles.footerColumn}>
                <h3>Publicações</h3>
                <Link to="/">Livros</Link>
                <Link to="/">Policy Briefs</Link>
                <Link to="/">Matérias</Link>
              </div>

              <div className={Styles.footerColumn}>
                <h3>Área do Admin</h3>
                <button className={Styles.loginButton} onClick={() => setShowLogin(true)}>Login</button>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.footerBottom}>
          <p>&copy; {year} Grupo Economia do Mar. Todos os direitos reservados.</p>
          <div className={Styles.footerLegalLinks}>
            <Link to="/">Política de Privacidade</Link>
            <Link to="/">Acessibilidade</Link>
            <Link to="/">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>

    <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
  </>
  )
}

export default Footer
