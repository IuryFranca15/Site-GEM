import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
import logo from '../assets/logo-gem.png'

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    
    <footer className='footer'>
      
      <div className="footer-logo">
        <Link to="/">
          <img src={logo} alt="Logo GEM" className="footer-logo-img" />
        </Link>
      </div>
      
    <div className="container">
    <div className="footer-top">
        <div className="footer-links">
          <h4>Sobre nós</h4>

          <Link to="#">Política de Privacidade</Link>
          <Link to="#">Contato</Link>
          <Link to="#">Acessibilidade</Link>

        </div>

        <div className="footer-parceiros">

          <h4>Parceiros Institucionais</h4>

          <Link to="#">Instituição 1</Link>
          <Link to="#">Instituição 2</Link>
          <Link to="#">Instituição 3</Link>


        </div>

        <div className="footer-social">

          <h4>Redes Sociais</h4>

          <div className="social-icons">

            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaLinkedin /></a>
          
          </div>

        </div>
      </div>

        <div class="footer-bottom">

            <p>&copy; Copyright {year} Grupo Economia do Mar (GEM). Todos os direitos reservados.</p>
            
        </div>

    </div>
</footer>

  )
}

export default Footer