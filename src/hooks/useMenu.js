import { useState } from 'react';

function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  return { isMenuOpen, handleMenuOpen, handleMenuClose };
}

export default useMenu;
