import React from "react";
import { motion } from "motion/react";

const Motion = ({ children, duration = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
