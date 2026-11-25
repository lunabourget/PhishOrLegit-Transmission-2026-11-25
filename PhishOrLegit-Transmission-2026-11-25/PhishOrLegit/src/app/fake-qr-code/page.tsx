import type { Metadata } from "next";

import { publicPath } from "@/lib/public-path";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fake QR Code video",
};

export default function FakeQrCodePage() {
  return (
    <main className={styles.fullscreen}>
      <video
        aria-label="Fake QR Code video"
        autoPlay
        className={styles.video}
        controls
        muted
        playsInline
        preload="auto"
      >
        <source src={publicPath("/Fake_QR_Code.mp4")} type="video/mp4" />
        Your browser does not support video playback.
      </video>
    </main>
  );
}
