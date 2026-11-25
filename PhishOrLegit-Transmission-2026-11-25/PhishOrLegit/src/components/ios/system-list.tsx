import type { ReactNode } from "react";

import styles from "./ios.module.css";

export function SystemList({ children }: { children: ReactNode }) {
  return <div className={styles.systemList}>{children}</div>;
}

type SystemListRowProps = {
  detail?: string;
  icon?: ReactNode;
  title: string;
  trailing?: ReactNode;
};

export function SystemListRow({
  detail,
  icon,
  title,
  trailing,
}: SystemListRowProps) {
  return (
    <div className={styles.systemListRow}>
      {icon ? <div className={styles.listIcon}>{icon}</div> : null}
      <div className={styles.listText}>
        <div className={styles.listTitle}>{title}</div>
        {detail ? <div className={styles.listDetail}>{detail}</div> : null}
      </div>
      {trailing ? <div className={styles.listTrailing}>{trailing}</div> : null}
    </div>
  );
}
