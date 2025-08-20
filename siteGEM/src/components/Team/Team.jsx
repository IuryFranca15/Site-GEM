import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Team.module.css';

import teamMembers from '../../data/teamData';
import groupData from '../../data/groupData';

const Team = ({ modo = "grupos" }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    }, 100);

    window.addEventListener('resize', equalizeCardHeights);
    return () => {
      window.removeEventListener('resize', equalizeCardHeights);
    };
  }, []);

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

  // =======================
  // MODO GERAL (carrossel único)
  // =======================
  if (modo === "geral") {
    const membrosAleatorios = [...teamMembers]
      .sort(() => Math.random() - 0.5) // embaralha
      .slice(0, 12); // limite de membros (pode mudar)

    return (
      <div className={styles.containerGeral}>
        <div className={styles.groupSection}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Conheça nossa equipe
          </motion.h2>

          <button
            aria-label="Slide anterior"
            ref={prevRef}
            className={`${styles.navButton} ${styles.navLeft}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            aria-label="Próximo Slide"
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
            onSlideChange={(swiper) => highlightPartialSlide(swiper)}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            slidesPerGroup={2}
            spaceBetween={30}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.3 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            className={styles.swiper}
          >
            {membrosAleatorios.map((membro) => (
              <SwiperSlide key={membro.id}>
                <Link to={`/equipe/${membro.id}`} className={styles.link}>
                  <div className={`${styles.grid} card`}>
                    <div className={styles.imageWrapper}>
                      <img src={membro.bg} alt="Imagem de fundo" className={styles.bgImage} />
                      <div className={styles.overlay}></div>
                    </div>
                    <div className={styles.contentInformation}>
                      <img src={membro.foto} alt={`Foto de ${membro.nome}`} className={styles.memberImage} />
                      <h3>{membro.nome}</h3>
                      <p>{membro.descricao}</p>
                      <div className={styles.iconWrapper}>
                        <img src={membro.iconeGrupo} alt="Ícone do grupo" className={styles.icon} />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    );
  }

  // =======================
  // MODO GRUPOS (original)
  // =======================
  return (
    <div className={styles.containerGrupos}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        Conheça nossa equipe
      </motion.h2>

      {groupData.map((grupo) => {
        const membrosDoGrupo = teamMembers.filter(m => m.grupoId === grupo.id);
        if (membrosDoGrupo.length === 0) return null;

        return (
          <motion.section
            key={grupo.id}
            className={styles.groupSection}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className={styles.groupTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              {grupo.nomeGrupo}
            </motion.h2>

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
              onSlideChange={(swiper) => highlightPartialSlide(swiper)}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              slidesPerGroup={2}
              spaceBetween={30}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 1.3 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3.5 },
                1280: { slidesPerView: 4.5 },
              }}
              className={styles.swiper}
            >
              {membrosDoGrupo.map((membro) => (
                <SwiperSlide key={membro.id}>
                  <Link to={`/equipe/${membro.id}`} className={styles.link}>
                    <div className={`${styles.grid} card`}>
                      <div className={styles.imageWrapper}>
                        <img src={membro.bg} alt="Imagem de fundo" className={styles.bgImage} />
                        <div className={styles.overlay}></div>
                      </div>
                      <div className={styles.contentInformation}>
                        <img src={membro.foto} alt={`Foto de ${membro.nome}`} className={styles.memberImage} />
                        <h3>{membro.nome}</h3>
                        <p>{membro.descricao}</p>
                        <div className={styles.iconWrapper}>
                          <img src={membro.iconeGrupo} alt="Ícone do grupo" className={styles.icon} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>
        );
      })}
    </div>
  );
};

export default Team;
