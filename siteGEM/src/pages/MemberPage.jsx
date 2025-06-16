import { useParams } from 'react-router-dom';
import teamMembers from '../data/teamData';

const MemberPage = () => {
  const { id } = useParams(); // Pega o ID da URL
  const membro = teamMembers.find(m => m.id === id); // Busca o membro certo

  if (!membro) {
    return <h2>Membro não encontrado!</h2>;
  }

  return (
    <div>
      <h2>{membro.nome}</h2>
      <img src={membro.foto} alt={`Foto de ${membro.nome}`} />
      <p>{membro.descricao}</p>
    </div>
  );
};

export default MemberPage;
