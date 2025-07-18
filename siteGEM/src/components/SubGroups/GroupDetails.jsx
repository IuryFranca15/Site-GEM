import { useParams } from 'react-router-dom';
import Style from './GroupDetails.module.css'
import groups from '../../data/groupData'
import teamData from '../../data/teamData'

import TeamCarouselByGroup from '../TeamCarouselByGroup/TeamCarouselByGroup'


const GroupDetails = () => {
  const { id } = useParams();
  const group = groups.find(m => m.id === id);

  if (!group) {
    return <h2>Grupo não encontrado!</h2>;
  }

  const membersByGroup = teamData.filter(m => m.grupoId === group.id);

  return (
    <div className={Style.container}>
      <div
        className={Style.groupDescription}
        style={{
          backgroundImage: `url(${group.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={Style.overlay}></div>

        <div className={Style.groupContent}>
          <img src={group.iconeGrupo} alt="Ícone do grupo" />
          <div className={Style.descriptionContent}>
            <h2 className={Style.nameGroup}>{group.nomeGrupo}</h2>
            <p className={Style.descricaoGroup}>{group.descricao}</p>
          </div>
        </div>
      </div>

      <div className={Style.content}>
        <div className={Style.members}>
          <h3 className={Style.memberTitle}>Conheça nossa equipe</h3>
          <TeamCarouselByGroup members={membersByGroup} />
        </div>
      </div>
    </div>
  )
}

export default GroupDetails