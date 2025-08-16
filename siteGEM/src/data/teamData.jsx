import bg from '../assets/image/pesca.jpg'
import membroEquipe from '../assets/image/Nathalia_Macedo.png'
import icone from '../assets/image/pesca-icone.png'
import iconeGem from '../assets/logoGemColored.png'
import images from '../utils/importImages';

const teamMembers = [
  {
    id: '1',
    grupoId: '',
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
    foto: images['Nathalia_Macedo.png'],
    nome: 'Nathália Macedo',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: 'Universidade Federal do Rio de Janeiro (UFRJ), Estudante Bacharelanda em Relações Internacionais(IRID/ UFRJ) Tecnólogo em Meteorologia(CEFET / RJ)',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '3',
    grupoId: '1',
    bg: bg,
    foto: images['Giselle_Gomes.png'],
    nome: 'Giselle Gomes',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: 'Licenciada em Ciências Biológicas, UFRJ',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '4',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Maria Ribeiro',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: '"Centro Paulista de Estudos da Transição Energética, Pesquisadora de Pós-Doutorado/Gestora de Parcerias Pós-doutorado pela Faculdade de Engenharia Agrícola em Gestão de Pesquisa, modalidade Educação e Difusão do Conhecimento, vinculado ao Programa de Apoio à Gestão de Grandes Centros Temáticos de Pesquisa, Unicamp (PPDG/PRP-Unicamp). Doutorado em Sustentabilidade (EACH-USP) Mestrado em Oceanografia (IO-USP) Bacharel em Oceanografia (IO-USP) Bacharel em Engenharia Ambiental (Unifran) Tecnólogo em Gestão Empresarial(FATEC- Guarulhos)',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '5',
    grupoId: '1',
    bg: bg,
    foto: images['Natália_Fachinelli.png'],
    nome: 'Natália Fachinelli',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: '"Programa de Planejamento Energético (PPE/COPPE/UFRJ), Doutoranda Mestrado em Planejamento Energético(PPE/ COPPE / UFRJ) Bacharel em Ciências Biológicas(UFRGS"',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '6',
    bg: bg,
    grupoId: '1',
    foto: membroEquipe,
    nome: 'Ângela Mascarenhas',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: '- Filicação/Instituição de vínculo: Pesquisadora vinculada ao Laboratório de Pesquisa em Monitoramento Ambiental Marinho – LAPMAR da Universidade Federal do Pará/ Pós-Doutoranda pelo Pós-Graduação em Oceanografia (UFPA). - Pós - doutorado pelo Programa de Pós- Graduação em Oceanografia da UFPA, vinculada ao projeto de Avaliação do potencial das correntes Marinhas Costa Norte do Brasil para Geração Elétrica- Pós - Doutorado em Oceanografia(PPGOC – UFPA) - Doutorado em Geofísica Marinha(CPGf - UFPA) - Mestrado em Geofísica Marinha(CPGf - UFPA) - Bacharel em Oceanografia(IG - UFPA)',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '7',
    grupoId: '1',
    bg: bg,
    foto: images['Ana_Barbara.png'],
    nome: 'Ana Barbara do Nascimento',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: 'Mestrado em Geologia (PPGeol/UFPR) Bacharel em Oceanografia(CEM/ UFPR)',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '8',
    grupoId: '1',
    bg: bg,
    foto: membroEquipe,
    nome: 'Elianne Omena',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: 'Pesquisadora da BDM Corp, Consultora Sênior Trilha Consultoria Ambiental e Consultora do Instituto Brasileiro de Biodiversidade Doutorado  em Ecologia, Unicamp Mestrado em Ecologia, Instituto de Biologia, UFRJ Bacharel em Biologia Marinha, Instituto de Biologia, UFRJ, Licenciatura em Ciências Biológicas',
    iconeGrupo: images['clima_colorido.png']
  },
  {
    id: '9',
    grupoId: '1',
    bg: bg,
    foto: images['Bianca_Cirino.png'],
    nome: 'Bianca Cirino',
    grupo: 'Clima e Meio Ambiente',
    descricao: 'Clima e Meio Ambiente',
    formacao: 'Instituto Oceanográfico (IO-USP), Pós-Graduação Mestrado em Oceanografia Biológica(IO- USP) Bacharel em Oceanografia(UERJ)',
    iconeGrupo: images['clima_colorido.png']
  },

  //Energias Offshore
  {
    id: '10',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Gabriel Magalhães',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Centro de Excelência Jean Monnet (FGV CEJM) e Centro de Direito Global (FGV CPDG), pesquisador Valverde Ralile Advocacia, advogado Doutorando em Direito da Regulação pela FGV Direito Rio Mestre em Estudos Marítimos pela Escola de Guerra Naval MBE/ A em Comércio Exterior pela UFRJ Bacharel em Direito pela UNIRIO Bacharel em Relações Internacionais pela PUC - Rio',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '11',
    grupoId: '2',
    bg: bg,
    foto: images['Alexandre_Motta.png'],
    nome: 'Alexandre Motta',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Construtora Siqueira Motta, Engenheiro Civil Pós- Graduação Lato Sensu - Especialização em MBI em Hidrogênio Verde(Universidade SENAI CIMATEC) Pós - Graduação Lato Sensu - Especialização em Engenharia de Campo - Construção e Montagem(PROMINP / CTG / UFPE) Pós - Graduação Lato Sensu - Especialização em Gestão e Engenharia de Petroleo e Gas(IBEC / INPG) Bacharel em Engenharia Civil(UNICAP)',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '12',
    grupoId: '2',
    bg: bg,
    foto: images['Diogo_Velasco.png'],
    nome: 'Diogo Velasco',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Pesquisador Bolsista pela CAPES em projeto intitulado Governança da Amazônia AzulDoutorando no Programa de Pós Graduação em Estudos Marítimos da Escola de Guerra Naval(PPGEM/ EGN) Mestrado Profissional em Análise e Gestão de Políticas Internacionais: Resolução de Conflitos e Cooperação para o Desenvolvimento(IRI / PUC - Rio)Bacharel em Relações Internacionais(IRI / PUC - Rio)',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '13',
    grupoId: '2',
    bg: bg,
    foto: images['Rinalde_Paulo.png'],
    nome: 'Rinalde de Paulo',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Suboficial da Marinha do Brasil. Doutorando no Programa de Pós Graduação em Estudos Marítima da Escola de Guerra Naval - PPGEM - EGN. Mestrado em Engenharia Urbana e Ambiental pela Pontifícia Universidade Católica do Rio de Janeiro e Master of Science in Urban and Environmental Engineering pela Technische Universität Carolo Wilhelmina Zu Braunschweig - Alemanha. Licenciado em Geografia pela Universidade do Estado do Rio de Janeiro(UERJ)',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '14',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Vinicius Vianna',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Escola de Guerra Naval (EGN), Doutorando Mestrado em Energia(PPGEN/ UFES) Graduação em Engenharia Mecânica(Faculdade Multivix)',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '15',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Bruno Goulart',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Ipiranga Produtos de Petróleo S.A., Analista de Planejamento Estratégico Sr. Especialista em Energias e Transição Energética(COPPE/ UFRJ) Bacharel em Relações Internacionais(IRID / UFRJ)',
    iconeGrupo: images['energias_colorido.png']
  },
  {
    id: '16',
    grupoId: '2',
    bg: bg,
    foto: membroEquipe,
    nome: 'Beatriz Saraiva',
    grupo: 'Energias Offshore',
    descricao: 'Energias Offshore',
    formacao: 'Universidade Federal do Rio de Janeiro, Estudante Bacharel em Defesa e Gestão Estratégica Internacional ',
    iconeGrupo: images['energias_colorido.png']
  },

  //Pesca e Agricultura

  {
    id: '17',
    grupoId: '3',
    bg: bg,
    foto: images['Alvaro_Junior.png'],
    nome: 'Alvaro Júnior',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Brava Energia, Analista Ambiental Pleno Bachareladom, Licenciatura em Ciências Biológicas (UFAL), MBA em Gestão Perícia e Auditoria Ambiental (IPOG) ',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '18',
    grupoId: '3',
    bg: bg,
    foto: images['Clara_Xavier.png'],
    nome: 'Clara Xavier',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Doutoranda do Programa de Pós-graduação em Oceanografia Ambiental da Universidade Federal do Espírito Santo Mestrado (quando aplicável):  Mestre em Oceanografia Ambiental pela Universidade Federal do Espírito Santo Graduação: Bacharelado em Ciências Biológicas com Ênfase em Ciências Ambientais pela Universidade Federal de Pernambuco',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '19',
    grupoId: '3',
    bg: bg,
    foto: images['Elisa_Prates.png'],
    nome: 'Elisa Prates',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Ministério da Pesca e Aquicultura, Oceanógrafa Universidade Federal do Rio Grande (FURG) /Universität Bremen (Bremen, Alemanha), DoutorandaDoutorado cotutela em Aquicultura e Ciências Naturais pela Universidade Federal do Rio Grande (FURG) e Universität Bremen, em colaboração  com o Alfred-Wegener-Institut (Bremerhaven, Alemanha) (em andamento), Mestrado em Aquicultura (IO/FURG) e Bacharel em Oceanologia (IO/FURG)',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '20',
    grupoId: '3',
    bg: bg,
    foto: images['Jessica_Cunha.png'],
    nome: 'Jéssica Cunha',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: ' Mestrado em Meio Ambiente e Desenvolvimento (UFPR) e Graduação em Oceanografia (UFBA)',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '21',
    grupoId: '3',
    bg: bg,
    foto: images['Cristiane_Caldeira.png'],
    nome: 'Cristiane Caldeira',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Biofeed Brasil – Zootecnista Mestrado em Zootecnia com linha de pesquisa em aquicultura pela Universidade Federal dos Vales do Jequitinhonha e Mucuri (UFVJM) Bacharel em Zootecnia pela Universidade Federal dos Vales do Jequitinhonha e Mucuri(UFVJM)',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '21',
    grupoId: '3',
    bg: bg,
    foto: images['João_Hughes.png'],
    nome: 'João Vítor Hughes',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Universidade Católica de Petrópolis (UCP), aluno Graduando em Relações Internacionais e Bacharel em Filosofia (UC',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '22',
    grupoId: '3',
    bg: bg,
    foto: membroEquipe,
    nome: 'Fulana de tal5',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Universidade Federal do Rio de Janeiro, Estudante Bacharel em Defesa e Gestão Estratégica Internacional ',
    iconeGrupo: images['pesca_colorido.png']
  },
  {
    id: '23',
    grupoId: '3',
    bg: bg,
    foto: membroEquipe,
    nome: 'Fulana de tal4',
    grupo: 'Pesca e Agricultura',
    descricao: 'Pesca e Agricultura',
    formacao: 'Universidade Federal do Rio de Janeiro, Estudante Bacharel em Defesa e Gestão Estratégica Internacional ',
    iconeGrupo: images['pesca_colorido.png']
  },

]

export default teamMembers
