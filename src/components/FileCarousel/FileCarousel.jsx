import styles from './FileCarousel.module.css';

import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function FileCarousel({ children }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [hasMultipleChildren, setHasMultipleChildren] = useState(false);

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -523, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 523, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      setScrollPos(carousel.scrollLeft);
    }
  };

  useEffect(() => {
    const checkChildren = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        setHasMultipleChildren(carousel.scrollWidth > carousel.clientWidth);
      }
    };
    
    requestAnimationFrame(checkChildren); 

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [children]); 

  const hasLeftScroll = scrollPos > 0;
  const hasRightScroll = carouselRef.current
    ? scrollPos + carouselRef.current.clientWidth < carouselRef.current.scrollWidth
    : false;

  return (
    <div className={styles.carouselWrapper}>
      {hasMultipleChildren && hasLeftScroll && (
        <button className={styles.scrollBtnLeft} onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
      )}
      <div className={styles.carousel} ref={carouselRef}>
        {children}
      </div>
      {hasMultipleChildren && hasRightScroll && (
        <button className={styles.scrollBtnRight} onClick={scrollRight}>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

export default FileCarousel;


