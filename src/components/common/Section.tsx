import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const SectionWrapper = ({
  children,
  className = "",
}: SectionWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
    variants={sectionVariants}
    className={className}
  >
    {children}
  </motion.div>
);
export default SectionWrapper;
