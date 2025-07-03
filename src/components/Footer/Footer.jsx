import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoGemColored.png'
import Styles from './Footer.module.css'

const Footer = () => {

  const year = new Date().getFullYear();

  return (

    <footer className={Styles.footer}>
        <div className={Styles.footerTop}>
          <img src={logo} alt="Logo GEM" className={Styles.footerLogoImg} />
          <div className={Styles.footerDescription}>
            <h1>Grupo Economia do Mar</h1>
            <p>
              O primeiro grupo de pesquisa brasileiro dedicado ao estudo da<br/>
              economia marinha e seus impactos socioeconômicos e <br/>
              ambientais.
            </p>
          </div>

        <div class={Styles.footerBottom}>

            <p>&copy; {year} Grupo Economia do Mar. Todos os direitos reservados.</p>

        </div>

    </div>
</footer>

  )
}

export default Footer
