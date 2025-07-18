import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import book from '../../assets/image/book-1.avif';
import { motion } from "framer-motion";


import styles from './RecommendedBooks.module.css';

const RecommendedBooks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.swiperWrapper}>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className={styles.mySwiper}
          >
            <SwiperSlide
              className={styles.swiperSlideImage}
              style={{ backgroundImage: `url(${book})` }}
            />
            <SwiperSlide className={styles.swiperSlideGreen} />
            <SwiperSlide className={styles.swiperSlideZinc} />
            <SwiperSlide className={styles.swiperSlideBlue} />
          </Swiper>
        </div>

        <div className={styles.rightBox}>
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2
            }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Livros e recomendações de leitura
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Coletânea de textos próprios do GEM e/ou de outras fontes
            relacionados ao tema Economia do Mar e desenvolvimento sustentável.
            A curadoria é feita por pesquisadores especialistas no tema.
          </motion.p>
          <a href="#">Veja mais publicações</a>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBooks;
