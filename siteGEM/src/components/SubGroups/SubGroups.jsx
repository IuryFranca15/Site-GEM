// import React, { useEffect, useState } from 'react';
import Styles from './SubGroups.module.css'
import { IoArrowForwardSharp } from "react-icons/io5";
import pesca from '../../assets/image/pesca.jpg'
import pescaIcone from '../../assets/image/pesca-icone.png'
import { Link } from 'react-router-dom';

const subgrupos = [
  {
    id: 1,
    titulo: 'Clima e Meio Ambiente',
    descricao: 'Analisa o impacto da poluição, mudanças climáticas e uso sustentável dos recursos marinhos, propondo políticas públicas que conciliem desenvolvimento econômico e preservação ambiental.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 2,
    titulo: 'Energias Offshore',
    descricao: 'Energias offshore são fontes de energia geradas no mar, como a eólica (ventos) e as ondas. Elas aproveitam o potencial marítimo para produzir energia limpa e renovável, com menor impacto ambiental.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 3,
    titulo: 'Pesca e Agricultura',
    descricao: 'A pesca e a aquicultura são atividades essenciais da economia do mar. Enquanto a pesca extrai recursos naturais, a aquicultura cria peixes e frutos do mar de forma controlada, garantindo produção sustentável de alimentos.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 4,
    titulo: 'Conceitos e Métodos',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 5,
    titulo: 'Defesa e Segurança',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },

  {
    id: 6,
    titulo: 'Blue Finance',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 7,
    titulo: 'Transporte Marítimo',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 8,
    titulo: 'Relações Geopolítica',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 9,
    titulo: 'Transportes e Infraestrutura',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 10,
    titulo: 'Relações sociais',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 11,
    titulo: 'Minerais offshore',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
  {
    id: 12,
    titulo: 'Turismo, esporte e lazer',
    descricao: 'Estuda as atividades pesqueiras sob a perspectiva econômica, social e ambiental. Analisa cadeias produtivas, políticas públicas e sustentabilidade do setor. Seu foco é contribuir com dados e propostas para o desenvolvimento da pesca no Brasil.',
    imagemFundo: pesca,
    icone: pescaIcone,
    link: '#'
  },
]

const SubGrupos = () => {
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
              <Link to={`/grupo/${grupo.id}`} key={grupo.id} className={Styles.link}>
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
              </Link>
            )
          })}
        </div>
      </div>
    </div >
  )
}


export default SubGrupos