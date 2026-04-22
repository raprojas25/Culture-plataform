import { motion } from "framer-motion";
import { slideIn } from "@/shared/utils/animations";

export const SlideIn = ({
  children,
  direction = "up",
  as = "div",
  ...props
}) => {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      variants={slideIn(direction)}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
