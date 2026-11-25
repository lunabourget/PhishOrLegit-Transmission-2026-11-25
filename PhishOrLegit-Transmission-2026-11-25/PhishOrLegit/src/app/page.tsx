import Image from "next/image";
import Link from "next/link";

import { IconButton } from "@/components/ios/icon-button";
import { NavigationBar } from "@/components/ios/navigation-bar";
import { SystemIcon } from "@/components/ios/system-icon";
import { SystemList, SystemListRow } from "@/components/ios/system-list";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import { LegacyHashRouter } from "@/components/routing/legacy-hash-router";
import { CardScanner } from "@/components/scanner/card-scanner";
import { publicPath } from "@/lib/public-path";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <LegacyHashRouter />
      <DeviceCanvas>
        <div className="screen">
          <NavigationBar
            title="Phish or Legit?"
            trailing={<IconButton icon="ellipsis" label="More options" />}
          />
          <div className={`scroll-content ${styles.content}`}>
            <div className={styles.brandMark}>
              <Image
                alt="Phish or Legit question mark logo"
                className={styles.brandLogo}
                height={96}
                priority
                src={publicPath("/brand/phish-or-legit-logo.svg")}
                width={96}
              />
            </div>
            <h1 className={styles.title}>Ready to investigate</h1>
            <p className={styles.introduction}>
              Scan a QR code on a physical card. The digital experience opens
              directly on this phone.
            </p>

            <CardScanner />

            <h2 className="section-title">How it works</h2>
            <SystemList>
              <SystemListRow
                detail="Use the QR code on a Scan me or LINK card."
                icon={<SystemIcon name="globe" size={20} />}
                title="Scan the card"
              />
              <SystemListRow
                detail="Inspect the message without revealing the answer."
                icon={<SystemIcon name="message" size={20} />}
                title="Investigate"
              />
              <SystemListRow
                detail="Vote with the physical PHISH or LEGIT card first."
                icon={<SystemIcon name="checkmark" size={20} />}
                title="Vote on the board"
              />
            </SystemList>
            <p className="section-caption">
              Training simulation only. Nothing entered here is sent or saved.
            </p>

          </div>
        </div>
      </DeviceCanvas>
    </>
  );
}
