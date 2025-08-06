import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './TeamCarouselByGroup.module.css';
import { Link } from 'react-router-dom';

const TeamCarouselByGroup = ({ members = [] }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Função para igualar alturas dos cards
  useEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll('.swiper-slide .card');
      if (!cards.length) return;

      cards.forEach(card => {
        card.style.height = 'auto';
      });

      const maxHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight));

      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    };

    setTimeout(() => {
      equalizeCardHeights();
    }, 300);

    window.addEventListener('resize', equalizeCardHeights);
    return () => {
      window.removeEventListener('resize', equalizeCardHeights);
    };
  }, []);

  const highlightPartialSlide = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.classList.remove('dimmed');
    });

    const partialIndex = swiper.activeIndex + Math.floor(swiper.params.slidesPerView);
    const partialSlide = swiper.slides[partialIndex];
    if (partialSlide) {
      partialSlide.classList.add('dimmed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 },
          }}
        >
          {members.map((member) => (
            <SwiperSlide key={member.id}>
              <Link className={styles.link}>
                <div className={`${styles.card} card`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={member.bg}
                      alt="Imagem que representa o subgrupo"
                      className={styles.bgImage}
                    />
                    <div className={styles.overlay}></div>
                  </div>

                  <div className={styles.contentInformation}>
                    <img
                      src={member.foto}
                      alt="Imagem da pessoa"
                      className={styles.memberImage}
                    />
                    <h3>{member.nome}</h3>
                    <p>{member.descricao}</p>
                    <img
                      src={member.iconeGrupo}
                      alt="Ícone do subgrupo"
                      className={styles.icon}
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeamCarouselByGroup;

