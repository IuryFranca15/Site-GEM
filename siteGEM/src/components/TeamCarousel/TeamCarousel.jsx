import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import TeamCard from './TeamCard/TeamCard';
import styles from './TeamCarousel.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from "framer-motion";
import images from '../../utils/importImages';


const teamMembers = [
  {
    name: 'Nathália Macedo',
    role: 'Clima e Meio Ambiente',
    image: images['Nathalia_Macedo.png'],
    bg: 'src/assets/image/ex-bg-grupo.webp',
    icon: images['clima_colorido.png']
  },

  {
    name: 'Giselle Gomes',
    role: 'Transportes e Infraestrutura',
    image: images['Giselle_Gomes.png'],
    bg: 'src/assets/image/ex-bg-grupo.webp',
    icon: images['transporte_colorido.png']
  },

  {
    name: 'Gabriel Magalhães',
    role: 'Energias Offshore',
    image: images['Nathalia_Macedo.png'],
    bg: 'src/assets/image/ex-bg-grupo.webp',
    icon: images['energias_colorido.png']
  },

  {
    name: 'Maria Ribeiro',
    role: 'Turismo, esporte e lazer',
    image: images['Giselle_Gomes.png'],
    bg: 'src/assets/image/ex-bg-grupo.webp',
    icon: images['turismo_colorido.png']
  },
  {
    name: 'Fernanda Lins',
    role: 'Conceitos e Métodos',
    bg: 'src/assets/image/ex-bg-grupo.webp',
    image: images['Fernanda_Lins.png'],
    icon: images['conceitos_colorido.png']
  },
  {
    name: 'Thiago Thierry',
    role: 'Defesa e Segurança',
    bg: 'src/assets/image/ex-bg-grupo.webp',
    image: images['Thiago_Thierry.png'],
    icon: images['defesa_colorido.png']
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
          slidesPerGroup={2}
          spaceBetween={20}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}

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
    </div >
  );
};

export default TeamCarousel;
