import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import book from '../../assets/image/book-1.avif';

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
          <h2>Livros e recomendações de leitura</h2>
          <p>
            Coletânea de textos próprios do GEM e/ou de outras fontes
            relacionados ao tema Economia do Mar e desenvolvimento sustentável.
            A curadoria é feita por pesquisadores especialistas no tema.
          </p>
          <a href="#">Veja mais publicações</a>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBooks;
