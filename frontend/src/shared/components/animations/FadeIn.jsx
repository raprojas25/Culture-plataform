import { motion } from "framer-motion";
import { fadeIn } from "@/shared/utils/animations";

export const FadeIn = ({ children, as = "div", ...props }) => {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
