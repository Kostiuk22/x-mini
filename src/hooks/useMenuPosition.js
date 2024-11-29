import { useEffect, useState } from 'react';

function useMenuPosition(ref) {
  const [position, setPosition] = useState('bottom');

  useEffect(() => {
    const handlePosition = () => {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom > viewportHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    };

    handlePosition();

    window.addEventListener('resize', handlePosition);

    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, [ref]);

  return position;
}

export default useMenuPosition;
