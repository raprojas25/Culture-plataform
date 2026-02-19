import { useState } from "react";

export const useAside = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return {
    handleClick,
    isMenuOpen,
  };
};
