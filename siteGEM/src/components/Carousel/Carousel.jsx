
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import { Link } from "react-router-dom";

const Carousel = ({ title, data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const highlightPartialSlide = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.classList.remove('dimmed');
    });

    const slidesPerView = Math.floor(swiper.params.slidesPerView);
    const partialIndex = swiper.activeIndex + slidesPerView;
    const partialSlide = swiper.slides[partialIndex];

    if (partialSlide) {
      partialSlide.classList.add('dimmed');
    }
  };

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
          {title}
        </motion.h2>
        <div className={styles.divider}></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
          className={styles.carouselWrapper}
        >
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
            onSlideChange={(swiper) => {
              highlightPartialSlide(swiper);
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerGroup={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.3 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            modules={[Navigation, Autoplay]}
            className={styles.swiper}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to="/publicacao/${id}">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={styles.card}
                    style={{ backgroundImage: `url(${item.image})` }}
                    role="img"
                    aria-label={item.title}
                  >
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      {item.text && <p className={styles.cardText}>{item.text}</p>}
                    </div>
                  </motion.div>

                </Link>

              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
