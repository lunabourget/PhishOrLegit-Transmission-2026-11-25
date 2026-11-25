"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { SystemIcon, type SystemIconName } from "./system-icon";
import styles from "./ios.module.css";

type IconButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  icon: SystemIconName;
  label: string;
};

export function IconButton({
  className,
  icon,
  label,
  type = "button",
  ...props
}: IconButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      aria-label={label}
      className={[styles.iconButton, className].filter(Boolean).join(" ")}
      title={label}
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
      type={type}
      whileTap={reduceMotion ? { scale: 1 } : { scale: 0.9 }}
      {...props}
    >
      <SystemIcon name={icon} size={21} />
    </motion.button>
  );
}
