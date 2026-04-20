import { motion } from 'framer-motion';
import { staggerItem } from '@/shared/utils/animations';

export const StaggerChildren = ({
  children,
  as = 'div',
  staggerDelay = 0.1,
  delayChildren = 0.2,
  ...props
}) => {
  const MotionComponent = motion(as);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  );
};

