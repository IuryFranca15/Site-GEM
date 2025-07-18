import styles from "./LatestArticles.module.css";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import { motion } from "framer-motion";

import post1 from "../../assets/image/post1.avif";
import post2 from "../../assets/image/post2.avif";
import post3 from "../../assets/image/post3.avif";
import post4 from "../../assets/image/post4.avif";
import post5 from "../../assets/image/post5.avif";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    },
  },
};


const cards = [
  { image: post1, title: "Crise energética: debates entre segurança e sustentabilidade", text: "Lore Ipsum lore ipsum lore ipsum" },
  { image: post2, title: "Os resíduos sólidos dos oceanos valem milhões de dólares", text: "" },
  { image: post3, title: "Parceria internacional do GEM com o CBE/MIIS (Califórnia, EUA)", text: "" },
  { image: post4, title: "Medida de redução de GEE de curto prazo da IMO", text: "" },
  { image: post5, title: "Senado aprova o marco das éolicas offshore", text: "" },
  { image: post5, title: "Assine nossa newsletter", text: "" }
];

const LatestArticles = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          Últimas matérias
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {cards.map((card, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ArticleCard
                image={card.image}
                title={card.title}
                text={card.text}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LatestArticles;
