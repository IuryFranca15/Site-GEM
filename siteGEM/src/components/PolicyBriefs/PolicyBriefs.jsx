import React, { useState } from "react";
import styles from './PolicyBriefs.module.css';
import book from '../../assets/image/book-1.avif';
import { motion } from "framer-motion";

const PolicyBriefs = ({ images = [] }) => {
  // Define imagens padrão com links
  const defaultImages = images.length
    ? images
    : Array(5).fill({ src: book, link: "#" });

  const [selectedIndex, setSelectedIndex] = useState(2);

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev === 0 ? defaultImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev === defaultImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carouselContainer}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        Confira os últimos policy briefs
      </motion.h2>
      <div className={styles.carouselWrapper}>
        <button className={styles.arrowLeft} onClick={prevSlide}>&lt;</button>
        <div className={styles.carousel}>
          {defaultImages.map((item, index) => {
            const position = index - selectedIndex;

            let className = styles.card;
            if (position === 0) className += ` ${styles.active}`;
            else if (Math.abs(position) === 1) className += ` ${styles.near}`;
            else className += ` ${styles.far}`;

            const imageSrc = typeof item.src === 'string' ? item.src : URL.createObjectURL(item.src);

            return (
              <a
                key={index}
                href={item.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={{ zIndex: 10 - Math.abs(position) }}
              >
                <img
                  src={imageSrc}
                  alt={`Policy Brief ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>
            );
          })}
        </div>
        <button className={styles.arrowRight} onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
};

export default PolicyBriefs;
