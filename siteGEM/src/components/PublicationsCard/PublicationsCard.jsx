import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./PublicationsCard.module.css";

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

const PublicationsCard = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
          Confira nossa publicações
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
          className={styles.carouselWrapper}
        >
          <button
            aria-label='Slide anterior'
            ref={prevRef}
            className={`${styles.navButton} ${styles.navLeft}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            aria-label='Próximo Slide'
            ref={nextRef}
            className={`${styles.navButton} ${styles.navRight}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <Swiper
            onSwiper={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            spaceBetween={30}
            slidesPerGroup={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.3 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            className={styles.swiper}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.card}
                  style={{ backgroundImage: `url(${card.image})` }}
                  role="img"
                  aria-label={card.title}
                >
                  <div className={styles.overlay}></div>
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    {card.text && <p className={styles.cardText}>{card.text}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicationsCard;
