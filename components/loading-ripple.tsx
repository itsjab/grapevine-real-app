'use client';

import { motion, type Transition } from 'motion/react';

function LoadingRipple() {
  const animation = {
    transform: ['scale(0)', 'scale(1)'],
    opacity: [1, 0],
  };

  const transition: Transition = {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: 'easeOut',
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative h-10 w-10">
        <motion.div
          className="absolute inset-0 rounded-full border-[5px] border-[#ff0088] opacity-0"
          animate={animation}
          transition={transition}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[5px] border-[#ff0088] opacity-0"
          animate={animation}
          transition={{
            ...transition,
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[5px] border-[#ff0088] opacity-0"
          animate={animation}
          transition={{
            ...transition,
            delay: 1,
          }}
        />
      </div>
    </div>
  );
}

export default LoadingRipple;
