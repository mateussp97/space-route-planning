import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CollapseProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function Collapse({ isOpen, children }: CollapseProps) {
  return (
    <motion.div
      className="w-full overflow-hidden"
      initial={false}
      animate={{ height: isOpen ? "fit-content" : 0 }}
    >
      {children}
    </motion.div>
  );
}
