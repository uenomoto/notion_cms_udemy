// アニメーション用コンポーネント
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const Motions = ({ children }: { children: ReactNode }) => {
  // くるっと回るアニメーション
  // const animateBox = {
  //   initial: {
  //     scale: 0,
  //     rotate: 0,
  //   },
  //   animate: {
  //     rotate: 360,
  //     scale: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 160,
  //       damping: 10,
  //       delay: 0.6,
  //     },
  //   },
  // };
  // 下からふわっとアニメーションです
  const animateBox = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <div className="xl:col-span-12">
      <motion.div initial="initial" animate="animate" variants={animateBox}>
        {children}
      </motion.div>
    </div>
  );
};
