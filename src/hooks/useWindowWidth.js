import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setCurrentWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return [currentWidth];
};
