// import React, { useEffect, useState } from 'react';
import Styles from './SubGroups.module.css'
import { IoArrowForwardSharp } from "react-icons/io5";
import pesca from '../../assets/image/pesca.jpg'
import pescaIcone from '../../assets/image/pesca-icone.png'

const subgrupos = [
  {
    id: 1,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 2,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 3,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 4,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 5,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 6,
    titulo: 'Pesca e Agricultura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
]

const SubGrupos = () => {
  // const [subgrupos, setSubgrupos] = useState([]);

  // useEffect(() => {
  //
  //   fetch('https://sua-api.com/subgrupos')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Erro ao buscar dados');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setSubgrupos(data);
  //     })
  //     .catch(error => {
  //       console.error('Erro ao buscar subgrupos:', error);
  //     });
  // }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <div className={Styles.contentTitle}>
          <h2 className={Styles.title}>Conheça os nossos subgrupos</h2>
          <div className={Styles.divider}></div>
        </div>
        <div className={Styles.grids}>
          {subgrupos.map((grupo) => {
            return (
              <div className={Styles.grid} key={grupo.id}>
                <div className={Styles.images}>
                  <img src={grupo.imagemFundo} alt={`Imagem de fundo do grupo ${grupo.titulo}`} className={Styles.bgImage} />
                  <img src={grupo.icone} alt={`Ícone do grupo ${grupo.titulo}`} className={Styles.icon} />
                </div>
                <div className={Styles.information}>
                  <h3 className={Styles.titleGrup}>{grupo.titulo}</h3>
                  <p className={Styles.description}>{grupo.descricao}</p>
                  <a href={grupo.link} className={Styles.button}>
                    Saiba mais
                    <IoArrowForwardSharp className={Styles.arrowIcon} />
                  </a>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}


export default SubGrupos