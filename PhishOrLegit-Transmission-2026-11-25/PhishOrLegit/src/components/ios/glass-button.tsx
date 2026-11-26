"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import styles from "./ios.module.css";

type GlassButtonProps = HTMLMotionProps<"button"> & {
  appearance?: "system" | "game";
  children: ReactNode;
  prominence?: "standard" | "primary" | "destructive";
};

export function GlassButton({
  appearance = "system",
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
    appearance === "game" ? styles.glassButton_game : undefined,
    appearance === "system" && prominence !== "primary"
      ? "material-glass"
      : undefined,
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
