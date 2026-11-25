"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./ios.module.css";

type Segment = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  ariaLabel: string;
  onChange: (value: string) => void;
  segments: readonly Segment[];
  value: string;
};

export function SegmentedControl({
  ariaLabel,
  onChange,
  segments,
  value,
}: SegmentedControlProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-label={ariaLabel}
      className={styles.segmentedControl}
      role="group"
    >
      {segments.map((segment) => {
        const selected = segment.value === value;

        return (
          <button
            aria-pressed={selected}
            className={styles.segment}
            key={segment.value}
            onClick={() => onChange(segment.value)}
            type="button"
          >
            {selected ? (
              <motion.span
                className={styles.segmentSelection}
                layoutId={`${ariaLabel}-selection`}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.15, duration: 0.35 }
                }
              />
            ) : null}
            <span className={styles.segmentLabel}>{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
}
