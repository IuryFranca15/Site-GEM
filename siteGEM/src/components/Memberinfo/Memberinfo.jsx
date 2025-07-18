import React from 'react'
import { useParams } from 'react-router-dom';
import teamMembers from '../../data/teamData';
import styles from './Memberinfo.module.css';
import pessoa from '../../assets/image/ex-pessoa.png'
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

const Memberinfo = () => {
  const { id } = useParams(); // Pega o ID da URL
  const membro = teamMembers.find(m => m.id === id); // Busca o membro certo

  if (!membro) {
    return <h2>Membro não encontrado!</h2>;
  }

  return (

    <div className={styles.card}>
      <div className={styles.header}>
        <img src={pessoa} alt="Imagem da pessoa" className={styles.photo} />
        <div className={styles.headerinfo}>
          <div className={styles.nameRow}>
            {/* <h1 className={styles.name}>{membro.nome}</h1> */}
            <h1 className={styles.name}>Gabriel Ralile</h1>
            <div className={styles.icons}>
              <a
                href="#" // substituir pelo Instagram real
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${membro.nome}`}
              >
                <FaInstagram className={styles.icon} />
              </a>
              <a
                href="#" // substituir pelo LinkedIn real
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${membro.nome}`}
              >
                <FaLinkedin className={styles.icon} />
              </a>
            </div>
          </div>
          {/*<h2 className={styles.area}>{membro.grupo}</h2> */}
          <p className={styles.area}>Pesca e agricultura</p>
          {/* <p className={styles.description}>{membro.descricao}</p> */}
          <p className={styles.description}>
            Especialista em economia ambiental e <br /> desenvolvimento sustentável, com foco em valoração<br />de recursos marinhos.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>EXPERIÊNCIA</h3>
        <p><strong>Pesquisador</strong> | Centro de Excelência Jean Monnet (FGV CEJM) e Centro de Direito Global (FGV CPDG)</p>
        <p className={styles.textDetail}>
          Atuação em projetos de pesquisa sobre integração regional, direito internacional, governança global e regulação marítima.
        </p>

        <p><strong>Advogado</strong> | Valverde Ralile Advocacia</p>
        <p className={styles.textDetail}>
          Atuação em direito público e regulatório, com foco em comércio exterior, direito administrativo e questões jurídicas relacionadas ao ambiente marítimo.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>FORMAÇÃO ACADÊMICA</h3>
        <p className={styles.textDetail}><strong>Fundação Getulio Vargas – FGV Direito Rio</strong><br />
          Doutorado em Direito da Regulação</p>

        <p className={styles.textDetail}><strong>Escola de Guerra Naval</strong><br />
          Mestrado em Estudos Marítimos</p>

        <p className={styles.textDetail}><strong>Universidade Federal do Rio de Janeiro – UFRJ</strong><br />
          MBE/A em Comércio Exterior</p>

        <p className={styles.textDetail}><strong>Universidade Federal do Estado do Rio de Janeiro – UNIRIO</strong><br />
          Bacharelado em Direito</p>

        <p className={styles.textDetail}><strong>Pontifícia Universidade Católica do Rio de Janeiro – PUC-Rio</strong><br />
          Bacharelado em Relações Internacionais</p>
      </div>
    </div>

  )
}

export default Memberinfo