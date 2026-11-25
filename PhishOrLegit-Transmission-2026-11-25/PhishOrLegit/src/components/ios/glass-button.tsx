"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import styles from "./ios.module.css";

type GlassButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  prominence?: "standard" | "primary" | "destructive";
};

export function GlassButton({
  children,
  className,
  prominence = "standard",
  type = "button",
  ...props
}: GlassButtonProps) {
  const reduceMotion = useReducedMotion();
  const classes = [
    styles.glassButton,
    styles[`glassButton_${prominence}`],
    prominence === "primary" ? undefined : "material-glass",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button
      className={classes}
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
      type={type}
      whileTap={reduceMotion ? { scale: 1 } : { scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
