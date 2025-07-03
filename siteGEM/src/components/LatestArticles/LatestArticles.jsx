
import styles from "./LatestArticles.module.css";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";

import post1 from "../../assets/image/post1.avif";
import post2 from "../../assets/image/post2.avif";
import post3 from "../../assets/image/post3.avif";
import post4 from "../../assets/image/post4.avif";
import post5 from "../../assets/image/post5.avif";

const cards = [
  { image: post1, title: "Crise energética: debates entre segurança e sustentabilidade", text: "Lore Ipsum lore ipsum lore ipsum" },
  { image: post2, title: "Os resíduos sólidos dos oceanos valem milhões de dólares", text: "" },
  { image: post3, title: "Parceria internacional do GEM com o CBE/MIIS (Califórnia, EUA)", text: "" },
  { image: post4, title: "Medida de redução de GEE de curto prazo da IMO", text: "" },
  { image: post5, title: "Senado aprova o marco das éolicas offshore", text: "" },
  { image: post5, title: "Assine nossa newsletter", text: "" }
];

const LatestArticles = ({ title = "Últimas matérias" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <ArticleCard
              key={index}
              image={card.image}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;