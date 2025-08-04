import React from 'react'
import Styles from './History.module.css'
import logo from '../../assets/logoGemHistory.png'

const History = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
      <div className={Styles.overlay}>
        <div className={Styles.textWrapper}>
          <h1 className={Styles.heading}>Nossa história</h1>

          <p>
            Criado em 2019, o Grupo Economia do Mar (GEM) é o único grupo
            de pesquisa do Brasil na área de Economia do Mar e Economia
            Azul, cadastrado no Diretório de Grupos de Pesquisa (DGP) do
            Conselho Nacional de Desenvolvimento Científico e Tecnológico
            (CNPq)
          </p>

          <p>
            O GEM nasceu de uma iniciativa individual do Prof. Dr. Thauan
            Santos (EGN), que identificou a ausência de um grupo sólido de
            pesquisa no contexto brasileiro sobre a temática em questão.
            Após mapeamento dos(as) interessados, e consideradas as
            diversidades regional, de gênero, de formação acadêmica e de
            experiência profissional, cada pesquisador(a) foi contatado(a)
            para a formação da equipe.
          </p>
        </div>

        <img src={logo} alt="Logo GEM" className={Styles.logoImg} />
      </div>
      </div>
    </div>
  )
}

export default History
