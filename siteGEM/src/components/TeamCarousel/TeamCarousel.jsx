import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import TeamCard from './TeamCard/TeamCard';
import styles from './TeamCarousel.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from "framer-motion";


const teamMembers = [
  {
    name: 'Nathália Macedo',
    role: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    bio: 'Especialista em mudanças climáticas e gestão ambiental, com foco em impactos costeiros e adaptação de comunidades marinhas.',
    image: 'src/assets/image/ex-2.webp',
    instagram: '#',
    linkedln: '#'
  },

  {
    name: 'Giselle Gomes',
    role: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    bio: 'Especialista em mudanças climáticas e gestão ambiental, com foco em impactos costeiros e adaptação de comunidades marinhas.',
    image: 'src/assets/image/ex-3.webp',
    instagram: '#',
    linkedln: '#'
  },

  {
    name: 'Gabriel Ralile de Figueiredo Magalhães',
    role: 'Pesquisador do subgrupo Energias Offshore',
    bio: 'Especialista em energias renováveis e offshore, com foco em geração eólica no mar e transição energética sustentável.',
    image: 'src/assets/image/ex-1.webp',
    instagram: '#',
    linkedln: '#'
  },

  {
    name: 'Maria Carolina H. Ribeiro',
    role: 'Pesquisadora do subgrupo Clima e Meio Ambiente',
    bio: 'Especialista em mudanças climáticas e gestão ambiental, com foco em impactos costeiros e adaptação de comunidades marinhas.',
    image: 'src/assets/image/ex-equipe.avif',
    instagram: '#',
    linkedln: '#'
  },
  {
    name: 'Fernanda Moreira Lins',
    role: 'Pesquisadora do subgrupo Conceitos e Métodos',
    bio: 'Especialista em conceitos e métodos aplicados à economia do mar, com foco em análise de dados, indicadores e modelagem socioeconômica.',
    image: 'src/assets/image/ex-2.webp',
    instagram: '#',
    linkedln: '#'
  },
  {
    name: 'Thiago Thierry',
    role: 'Pesquisador do subgrupo Defesa e Segurança',
    bio: 'Especialista em defesa marítima e segurança costeira, com foco em proteção de recursos marinhos e vigilância estratégica.',
    image: 'src/assets/image/ex-4.webp',
    instagram: '#',
    linkedln: '#'
  },
]


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
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Nossa equipe
          </motion.h2>
          {/* <div className={styles.divider}></div> */}
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
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          className={styles.mySwiper}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
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
