import Link from "next/link";

import { SystemIcon } from "@/components/ios/system-icon";
import { DeviceCanvas } from "@/components/layout/device-canvas";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <DeviceCanvas>
      <main className={styles.notFound}>
        <SystemIcon name="warning" size={48} />
        <h1>Card not found</h1>
        <p>Check the QR code and scan it again.</p>
        <Link href="/">Return to start</Link>
      </main>
    </DeviceCanvas>
  );
}
