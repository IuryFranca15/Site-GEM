import Styles from './Team.module.css'
import teamMembers from '../../data/teamData.jsx';
import { Link } from 'react-router-dom';

const Team = () => {
  const ceo = teamMembers[0]
  const otherMembers = teamMembers.slice(1)

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <div className={Styles.contentTitle}>
          <h2 className={Styles.title}>Conheça nossa equipe</h2>
          <div className={Styles.divider}></div>
        </div>


        <div className={Styles.ceoContainer}>
          <Link to={`/equipe/${ceo.id}`} key={ceo.id} className={Styles.link}>
            <div className={Styles.ceoCard}>
              <img
                src={ceo.foto}
                alt={`Foto de ${ceo.nome}`}
                className={Styles.ceoCardImage}
              />
              <div className={Styles.ceoCardContent}>
                <h3>{ceo.nome}</h3>
                <span>{ceo.grupo}</span>
                <p>{ceo.descricao}</p>
                <img
                  src={ceo.iconeGrupo}
                  alt={`Ícone do grupo ${ceo.grupo}`}
                  className={Styles.ceoCardIcon}
                />
              </div>

            </div>
          </Link>
        </div>


        <div className={Styles.grids}>
          {otherMembers.map((membro) => (
            <Link to={`/equipe/${membro.id}`} key={membro.id} className={Styles.link}>
              <div className={Styles.grid}>
                <img src={membro.bg} alt="Imagem que representa o subgrupo" className={Styles.bgImage} />
                <div className={Styles.contentInformation}>
                  <img src={membro.foto} alt="Imagem da pessoa" className={Styles.memberImage} />
                  <h3>{membro.nome}</h3>
                  <span>{membro.grupo}</span>
                  <p>{membro.descricao}</p>
                  <img src={membro.iconeGrupo} alt="Ícone do subgrupo" className={Styles.icon} />
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;