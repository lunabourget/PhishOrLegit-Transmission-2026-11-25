import type { SystemIconName } from "./system-icon";
import { SystemIcon } from "./system-icon";
import styles from "./ios.module.css";

type Tab = {
  icon: SystemIconName;
  label: string;
  selected?: boolean;
};

export function TabBar({ tabs }: { tabs: readonly Tab[] }) {
  return (
    <nav aria-label="Primary" className={`${styles.tabBar} material-glass`}>
      {tabs.map((tab) => (
        <button
          aria-current={tab.selected ? "page" : undefined}
          className={styles.tabItem}
          data-selected={tab.selected ? "true" : "false"}
          key={tab.label}
          type="button"
        >
          <SystemIcon name={tab.icon} size={23} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
