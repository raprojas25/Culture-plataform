// Fade
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
  
// fadeInUp
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y:20, transition: { duration: 0.4 } },
};

// Slide desde diferentes direcciones
export const slideIn = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
    y: direction === "up" ? -20 : direction === "down" ? 20 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    transition: { duration: 0.2 },
  },
});

// Escala
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// Para contenedores con hijos que se animan en secuencia (stagger)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

// Variant para elementos hijos dentro de un stagger
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20 },
};
