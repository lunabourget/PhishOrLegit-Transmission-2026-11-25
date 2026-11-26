"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { IconButton } from "@/components/ios/icon-button";
import { NavigationBar } from "@/components/ios/navigation-bar";
import { SystemIcon } from "@/components/ios/system-icon";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import type { LinkCatalogEntry } from "@/data/links/catalog";
import { currentGameRules } from "@/domain/game/rules";
import { publicHomeUrl } from "@/lib/public-path";

import styles from "./link-experience.module.css";

type LinkAction = "click" | "report";

function getConsequence(
  verdict: LinkCatalogEntry["verdict"],
  action: LinkAction,
) {
  if (verdict === "PHISH") {
    return action === "click"
      ? `Rickroll · move back ${Math.abs(currentGameRules.link.phishingClickMovement)}`
      : `Move forward ${currentGameRules.link.phishingReportMovement}`;
  }

  return action === "click"
    ? "Shortcut · follow the dashed arrow"
    : "Stay on the LINK space";
}

export function LinkExperience({ link }: { link: LinkCatalogEntry }) {
  const [action, setAction] = useState<LinkAction | null>(null);

  return (
    <DeviceCanvas>
      <div className={`screen ${styles.screen}`}>
        <NavigationBar
          leading={
            <IconButton
              icon="back"
              label="Back to Home"
              onClick={() => window.location.assign(publicHomeUrl)}
            />
          }
          title={`LINK · ${link.id}`}
        />
        <div className={`scroll-content ${styles.content}`}>
          <div className={styles.cardLabel}>
            <span>LINK card</span>
            <span>{link.id}</span>
          </div>

          <article aria-label="Link message preview" className={styles.preview}>
            <header className={styles.previewHeader}>
              <span className={styles.previewIcon}>
                <SystemIcon name="globe" size={22} />
              </span>
              <div className={styles.senderDetails}>
                <h1 className={styles.sender}>{link.sender}</h1>
                <span className={styles.previewType}>Link message</span>
              </div>
            </header>
            <div className={styles.previewBody}>
              <p>{link.message}</p>
              <div aria-label="Link destination" className={styles.destination}>
                <SystemIcon name="globe" size={18} />
                <span>{link.url}</span>
              </div>
            </div>
          </article>

          {action ? (
            <section
              aria-live="polite"
              className={styles.resultPanel}
              data-verdict={link.verdict}
            >
              <span className={styles.answer}>Answer · {link.verdict}</span>
              <h2 className={styles.sectionTitle}>
                {link.verdict === "PHISH"
                  ? "This link is phishing."
                  : "This link is legitimate."}
              </h2>
              <p className={styles.explanation}>{link.explanation}</p>
              <div className={styles.consequence}>
                <span>
                  {action === "click" ? "You clicked" : "You reported"}
                </span>
                <strong>{getConsequence(link.verdict, action)}</strong>
              </div>
              <GlassButton onClick={() => setAction(null)}>
                Try another action
              </GlassButton>
            </section>
          ) : (
            <section className={styles.actionPanel}>
              <div>
                <h2 className={styles.sectionTitle}>Click or report?</h2>
                <p className={styles.actionDescription}>
                  Choose what you would do. This is a safe simulation; the
                  destination will not open.
                </p>
              </div>
              <div className={styles.actionButtons}>
                <GlassButton
                  onClick={() => setAction("click")}
                  prominence="primary"
                >
                  Click link
                </GlassButton>
                <GlassButton onClick={() => setAction("report")}>
                  Report link
                </GlassButton>
              </div>
            </section>
          )}
        </div>
      </div>
    </DeviceCanvas>
  );
}
