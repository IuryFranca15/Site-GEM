import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import TeamCard from './TeamCard/TeamCard';
import styles from './TeamCarousel.module.css';
import 'swiper/css';
import 'swiper/css/navigation';



const teamMembers = Array.from({ length: 6 }, (_, i) => ({
  name: `Fulano ${i + 1}`,
  role: 'Pesquisador(a)',
  bio: 'Especialista em economia ambiental...',
  image: 'src/assets/image/ex-equipe.avif',
  instagram: '#',
  linkedln: '#'
}));


const TeamCarousel = () => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const highlightPartialSlide = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.classList.remove('dimmed');
    });
    const partialIndex = swiper.activeIndex + 4;
    const partialSlide = swiper.slides[partialIndex];
    if (partialSlide) {
      partialSlide.classList.add('dimmed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Nossa equipe</h2>
          <div className={styles.divider}></div>
        </div>

        <button aria-label='Slide anterior' ref={prevRef} className={`${styles.navButton} ${styles.navLeft}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button aria-label='Próximo Slide' ref={nextRef} className={`${styles.navButton} ${styles.navRight}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            highlightPartialSlide(swiper);
          }}
          onSlideChange={(swiper) => {
            highlightPartialSlide(swiper);
          }}
          spaceBetween={20}
          modules={[Navigation]}
          className={styles.mySwiper}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },   // <- Aqui limitamos a 2 cards no tablet
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 },
          }}
        >

          {teamMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <TeamCard {...member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeamCarousel;
