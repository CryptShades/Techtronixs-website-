import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        getComputedStyle(target).cursor === "pointer";
      setIsPointer(isClickable);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block mix-blend-multiply dark:mix-blend-screen"
        animate={{
          x: pos.x - (isPointer ? 20 : 12),
          y: pos.y - (isPointer ? 20 : 12),
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      >
        <div
          className={`rounded-full bg-primary/50 transition-all duration-200 ${
            isPointer ? "w-10 h-10" : "w-6 h-6"
          }`}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{ type: "spring", stiffness: 2000, damping: 40 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-secondary/70" />
      </motion.div>
    </>
  );
};

export default CursorGlow;
