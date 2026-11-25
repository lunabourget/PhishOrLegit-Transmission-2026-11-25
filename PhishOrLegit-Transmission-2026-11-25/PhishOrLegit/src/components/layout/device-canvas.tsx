import type { ReactNode } from "react";

import styles from "./device-canvas.module.css";

export function DeviceCanvas({ children }: { children: ReactNode }) {
  return (
    <main className={styles.desktopCanvas}>
      <section
        aria-label="Mobile application preview"
        className={styles.device}
      >
        <div aria-hidden="true" className={styles.desktopStatusBar}>
          <span>9:41</span>
          <span className={styles.dynamicIsland} />
          <span className={styles.statusGlyphs}>
            <span className={styles.cellular}>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className={styles.wifi} />
            <span className={styles.battery}>
              <i />
            </span>
          </span>
        </div>
        <div className={styles.viewport}>{children}</div>
        <div aria-hidden="true" className={styles.homeIndicator} />
      </section>
    </main>
  );
}
