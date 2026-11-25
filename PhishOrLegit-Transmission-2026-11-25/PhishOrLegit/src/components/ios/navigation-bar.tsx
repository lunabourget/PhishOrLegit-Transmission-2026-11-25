import type { ReactNode } from "react";

import styles from "./ios.module.css";

type NavigationBarProps = {
  leading?: ReactNode;
  title: string;
  trailing?: ReactNode;
};

export function NavigationBar({
  leading,
  title,
  trailing,
}: NavigationBarProps) {
  return (
    <header className={styles.navigationBar}>
      <div className={styles.navigationSlot}>{leading}</div>
      <h1 className={styles.navigationTitle}>{title}</h1>
      <div className={`${styles.navigationSlot} ${styles.navigationTrailing}`}>
        {trailing}
      </div>
    </header>
  );
}
