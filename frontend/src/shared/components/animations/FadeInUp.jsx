import { motion } from 'framer-motion';
import { fadeInUp } from '@/shared/utils/animations';

export const FadeInUp = ({
  children,
  as = 'div',
  ...props
}) => {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

