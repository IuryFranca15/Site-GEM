
import { useState } from "react";
import PostFilters from "../PostFilters/PostFilters";
import Carousel from "../Carousel/Carousel";
import CardsGrid from "../CardGrids/CardGrids";

import post1 from "../../assets/image/post1.avif";
import post2 from "../../assets/image/post2.avif";
import post3 from "../../assets/image/post3.avif";
import style from './Publication.module.css'

const dados = [
  { id: 1, image: post1, title: "Publicação A", group: "Clima e meio ambiente", type: "Livro", year: 2010 },
  { id: 2, image: post2, title: "Publicação B", group: "Energias offshore", type: "Policy Brief", year: 2018 },
  { id: 3, image: post3, title: "Publicação C", group: "Pesca e aquicultura", type: "Relatório", year: 2015 },
  { id: 4, image: post2, title: "Publicação D", group: "Clima e meio ambiente", type: "Notícia", year: 2012 },
  { id: 5, image: post1, title: "Publicação E", group: "Blue Finance", type: "Artigo", year: 2020 },
];

const allGroups = [
  "Blue Finance",
  "Clima e meio ambiente",
  "Conceitos e métodos",
  "Construção e reparação naval",
  "Defesa e segurança",
  "Energias offshore",
  "Minerais offshore",
  "Pesca e aquicultura",
  "Relações geopolíticas",
  "Relações sociais",
  "Transporte e infraestrutura",
  "Turismo, esporte e lazer",
];

const allTypes = ["Livro", "Policy Brief", "Relatório", "Artigo", "Notícia"];

export default function Publications() {
  const [filtros, setFiltros] = useState({
    groups: [],
    types: [],
    search: "",
    yearRange: [1990, new Date().getFullYear()],
  });

  // Filtragem
  const filtrarDados = () => {
    return dados.filter((item) => {
      const matchGroup = filtros.groups.length === 0 || filtros.groups.includes(item.group);
      const matchType = filtros.types.length === 0 || filtros.types.includes(item.type);
      const matchSearch = filtros.search === "" || item.title.toLowerCase().includes(filtros.search.toLowerCase());
      const matchYear = item.year >= filtros.yearRange[0] && item.year <= filtros.yearRange[1];
      return matchGroup && matchType && matchSearch && matchYear;
    });
  };

  const dadosFiltrados = filtrarDados();

  // Randomiza os dados para os carrosséis
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
  const dadosSubgrupos = shuffleArray(dados).slice(0, 5);
  const dadosNatureza = shuffleArray(dados).slice(0, 5);

  const filtrosAtivos = !!(
    filtros.groups.length ||
    filtros.types.length ||
    filtros.search.trim() ||
    filtros.yearRange[0] !== 1990 ||
    filtros.yearRange[1] !== new Date().getFullYear()
  );

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.filtros}>
          <PostFilters
            allGroups={allGroups}
            allTypes={allTypes}
            onFilterChange={(novoFiltro) => setFiltros(novoFiltro)}
          />

        </div>

        {/* Lado direito: carrosséis ou grid */}
        <div style={{ flex: 1 }}>
          {!filtrosAtivos ? (
            <>
              <Carousel title="Publicações por Subgrupos" data={dadosSubgrupos} />
              <Carousel title="Natureza das Publicações" data={dadosNatureza} />
            </>
          ) : (
            <CardsGrid data={dadosFiltrados} />
          )}
        </div>
      </div>

    </div>
  );
}
