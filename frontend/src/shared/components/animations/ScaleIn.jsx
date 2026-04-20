import { motion } from 'framer-motion';
import { scaleIn } from '@/shared/utils/animations';

export const ScaleIn = ({
  children,
  as = 'div',
  ...props
}) => {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

