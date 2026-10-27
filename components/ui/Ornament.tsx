'use client';

import { motion } from 'motion/react';

interface OrnamentProps {
  className?: string;
  color?: string;
  animate?: boolean;
}

export default function Ornament({
  className = '',
  color = '#F3DFA2',
  animate = true,
}: OrnamentProps) {
  if (!animate) {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <span className="w-10 h-px" style={{ backgroundColor: `${color}80` }} />
        <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: color }} />
        <span className="w-10 h-px" style={{ backgroundColor: `${color}80` }} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center gap-3 group cursor-default select-none ${className}`}
    >
      {/* Left Hairline line: extends from center outward */}
      <motion.span
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-10 sm:w-12 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}90)`,
        }}
      />

      {/* Center Diamond: continuous subtle luxury breathe & gentle rotation on hover */}
      <motion.span
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        animate={{
          boxShadow: [
            `0 0 0px ${color}00`,
            `0 0 10px ${color}60`,
            `0 0 0px ${color}00`,
          ],
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: { duration: 0.5, delay: 0.05 },
          rotate: { duration: 0.6, delay: 0.05 },
        }}
        whileHover={{
          rotate: 225,
          scale: 1.3,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        className="w-1.5 h-1.5 inline-block shrink-0 rounded-[0.5px]"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {/* Right Hairline line: extends from center outward */}
      <motion.span
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-10 sm:w-12 h-px"
        style={{
          background: `linear-gradient(90deg, ${color}90, transparent)`,
        }}
      />
    </motion.div>
  );
}
