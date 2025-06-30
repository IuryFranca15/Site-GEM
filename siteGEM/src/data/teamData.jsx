import bg from '../assets/image/pesca.jpg'
import membroEquipe from '../assets/image/ex-pessoa.png'
import icone from '../assets/image/pesca-icone.png'
import iconeGem from '../assets/logoGemColored.png'

const teamMembers = [
  {
    id: '1',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Thauan Santos',
    grupo: 'Coordenador do GEM',
    formacao: 'Pesquisador do subgrupo Pesca e Agricultura',
    iconeGrupo: iconeGem
  },

  //Clime a e Meio Ambiente
  {
    id: '2',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Nathália Macedo',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: 'Universidade Federal do Rio de Janeiro (UFRJ), Estudante Bacharelanda em Relações Internacionais(IRID/ UFRJ) Tecnólogo em Meteorologia(CEFET / RJ)',
    iconeGrupo: icone
  },
  {
    id: '3',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Giselle Gomes',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: 'Licenciada em Ciências Biológicas, UFRJ',
    iconeGrupo: icone
  },
  {
    id: '4',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Maria Carolina H. Ribeiro',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: '"Centro Paulista de Estudos da Transição Energética, Pesquisadora de Pós-Doutorado/Gestora de Parcerias Pós-doutorado pela Faculdade de Engenharia Agrícola em Gestão de Pesquisa, modalidade Educação e Difusão do Conhecimento, vinculado ao Programa de Apoio à Gestão de Grandes Centros Temáticos de Pesquisa, Unicamp (PPDG/PRP-Unicamp). Doutorado em Sustentabilidade (EACH-USP) Mestrado em Oceanografia (IO-USP) Bacharel em Oceanografia (IO-USP) Bacharel em Engenharia Ambiental (Unifran) Tecnólogo em Gestão Empresarial(FATEC- Guarulhos)',
    iconeGrupo: icone
  },
  {
    id: '5',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Natália Pezzi Fachinelli',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: '"Programa de Planejamento Energético (PPE/COPPE/UFRJ), Doutoranda Mestrado em Planejamento Energético(PPE/ COPPE / UFRJ) Bacharel em Ciências Biológicas(UFRGS"',
    iconeGrupo: icone
  },
  {
    id: '6',
    bg: bg,
    grupoId: '1',
    foto: membroEquipe,
    nome: 'Ângela Carolina Cidon Mascarenhas',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: '- Filicação/Instituição de vínculo: Pesquisadora vinculada ao Laboratório de Pesquisa em Monitoramento Ambiental Marinho – LAPMAR da Universidade Federal do Pará/ Pós-Doutoranda pelo Pós-Graduação em Oceanografia (UFPA). - Pós - doutorado pelo Programa de Pós- Graduação em Oceanografia da UFPA, vinculada ao projeto de Avaliação do potencial das correntes Marinhas Costa Norte do Brasil para Geração Elétrica- Pós - Doutorado em Oceanografia(PPGOC – UFPA) - Doutorado em Geofísica Marinha(CPGf - UFPA) - Mestrado em Geofísica Marinha(CPGf - UFPA) - Bacharel em Oceanografia(IG - UFPA)',
    iconeGrupo: icone
  },
  {
    id: '7',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Ana Barbara Teixeira do Nascimento',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: 'Mestrado em Geologia (PPGeol/UFPR) Bacharel em Oceanografia(CEM/ UFPR)',
    iconeGrupo: icone
  },
  {
    id: '8',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Elianne Pessoa Omena',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: 'Pesquisadora da BDM Corp, Consultora Sênior Trilha Consultoria Ambiental e Consultora do Instituto Brasileiro de Biodiversidade Doutorado  em Ecologia, Unicamp Mestrado em Ecologia, Instituto de Biologia, UFRJ Bacharel em Biologia Marinha, Instituto de Biologia, UFRJ, Licenciatura em Ciências Biológicas',
    iconeGrupo: icone
  },
  {
    id: '9',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Bianca Cirino',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    formacao: 'Instituto Oceanográfico (IO-USP), Pós-Graduação Mestrado em Oceanografia Biológica(IO- USP) Bacharel em Oceanografia(UERJ)',
    iconeGrupo: icone
  },

  //Energias Offshore
  {
    id: '10',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Gabriel Ralile de Figueiredo Magalhães',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Centro de Excelência Jean Monnet (FGV CEJM) e Centro de Direito Global (FGV CPDG), pesquisador Valverde Ralile Advocacia, advogado Doutorando em Direito da Regulação pela FGV Direito Rio Mestre em Estudos Marítimos pela Escola de Guerra Naval MBE/ A em Comércio Exterior pela UFRJ Bacharel em Direito pela UNIRIO Bacharel em Relações Internacionais pela PUC - Rio',
    iconeGrupo: icone
  },
  {
    id: '11',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Alexandre de Siqueira Motta',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Construtora Siqueira Motta, Engenheiro Civil Pós- Graduação Lato Sensu - Especialização em MBI em Hidrogênio Verde(Universidade SENAI CIMATEC) Pós - Graduação Lato Sensu - Especialização em Engenharia de Campo - Construção e Montagem(PROMINP / CTG / UFPE) Pós - Graduação Lato Sensu - Especialização em Gestão e Engenharia de Petroleo e Gas(IBEC / INPG) Bacharel em Engenharia Civil(UNICAP)',
    iconeGrupo: icone
  },
  {
    id: '12',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Diogo Velasco',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Pesquisador Bolsista pela CAPES em projeto intitulado Governança da Amazônia AzulDoutorando no Programa de Pós Graduação em Estudos Marítimos da Escola de Guerra Naval(PPGEM/ EGN) Mestrado Profissional em Análise e Gestão de Políticas Internacionais: Resolução de Conflitos e Cooperação para o Desenvolvimento(IRI / PUC - Rio)Bacharel em Relações Internacionais(IRI / PUC - Rio)',
    iconeGrupo: icone
  },
  {
    id: '13',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Rinalde de Paulo',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Suboficial da Marinha do Brasil. Doutorando no Programa de Pós Graduação em Estudos Marítima da Escola de Guerra Naval - PPGEM - EGN. Mestrado em Engenharia Urbana e Ambiental pela Pontifícia Universidade Católica do Rio de Janeiro e Master of Science in Urban and Environmental Engineering pela Technische Universität Carolo Wilhelmina Zu Braunschweig - Alemanha. Licenciado em Geografia pela Universidade do Estado do Rio de Janeiro(UERJ)',
    iconeGrupo: icone
  },
  {
    id: '14',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Vinicius Wittig Vianna',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Escola de Guerra Naval (EGN), Doutorando Mestrado em Energia(PPGEN/ UFES) Graduação em Engenharia Mecânica(Faculdade Multivix)',
    iconeGrupo: icone
  },
  {
    id: '15',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Bruno Moreira Goulart',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisador do subgrupo Energias Offshore',
    formacao: 'Ipiranga Produtos de Petróleo S.A., Analista de Planejamento Estratégico Sr. Especialista em Energias e Transição Energética(COPPE/ UFRJ) Bacharel em Relações Internacionais(IRID / UFRJ)',
    iconeGrupo: icone
  },
  {
    id: '16',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Beatriz Barbosa Saraiva',
    grupo: 'Energias Offshore',
    descricao: 'Pesquisadora do subgrupo Energias Offshore',
    formacao: 'Universidade Federal do Rio de Janeiro, Estudante Bacharel em Defesa e Gestão Estratégica Internacional ',
    iconeGrupo: icone
  },

]

export default teamMembers
