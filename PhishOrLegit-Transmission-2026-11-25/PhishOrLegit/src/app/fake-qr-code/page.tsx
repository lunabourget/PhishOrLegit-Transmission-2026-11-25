import type { Metadata } from "next";
import Link from "next/link";

import { NavigationBar } from "@/components/ios/navigation-bar";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import { publicPath } from "@/lib/public-path";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fake QR Code video",
};

export default function FakeQrCodePage() {
  return (
    <DeviceCanvas>
      <div className="screen">
        <NavigationBar
          leading={
            <Link className={styles.backLink} href="/">
              Home
            </Link>
          }
          title="Fake QR Code"
        />
        <div className={`scroll-content ${styles.content}`}>
          <h1 className={styles.title}>Fake QR Code</h1>
          <video
            aria-label="Fake QR Code video"
            className={styles.video}
            controls
            playsInline
            preload="metadata"
          >
            <source src={publicPath("/Fake_QR_Code.mp4")} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      </div>
    </DeviceCanvas>
  );
}
