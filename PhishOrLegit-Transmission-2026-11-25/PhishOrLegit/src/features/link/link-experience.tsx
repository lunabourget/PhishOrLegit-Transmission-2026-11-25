"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { GameCardShell } from "@/components/game/game-card-shell";
import { SystemIcon } from "@/components/ios/system-icon";
import type { LinkCatalogEntry } from "@/data/links/catalog";
import { currentGameRules } from "@/domain/game/rules";

import styles from "./link-experience.game.module.css";

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
    <GameCardShell
      backLabel="Back to Home"
      channel="LINK MESSAGE"
      kind="link"
      scenarioId={link.id}
    >
      <article aria-label="Link message preview" className={styles.preview}>
        <header className={styles.previewHeader}>
          <span aria-hidden="true" className={styles.previewIcon}>
            <SystemIcon name="globe" size={22} />
          </span>
          <div className={styles.senderDetails}>
            <span className={styles.previewType}>SENDER</span>
            <h1 className={styles.sender}>{link.sender}</h1>
          </div>
        </header>
        <div className={styles.previewBody}>
          <p>{link.message}</p>
          <div aria-label="Link destination" className={styles.destination}>
            <SystemIcon aria-hidden="true" name="globe" size={18} />
            <span dir="ltr">{link.url}</span>
          </div>
        </div>
      </article>

      {action ? (
        <section
          aria-live="polite"
          className={styles.resultPanel}
          data-verdict={link.verdict}
        >
          <span className={styles.outcome}>
            {action === "click" ? "You clicked" : "You reported"}
          </span>
          <h2 className={styles.sectionTitle}>
            {link.verdict === "PHISH"
              ? "This link is phishing."
              : "This link is legitimate."}
          </h2>
          <p className={styles.explanation}>{link.explanation}</p>
          <div className={styles.consequence}>
            <span>Game effect</span>
            <strong>{getConsequence(link.verdict, action)}</strong>
          </div>
          <GlassButton appearance="game" onClick={() => setAction(null)}>
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
            <GlassButton appearance="game" onClick={() => setAction("click")}>
              Click link
            </GlassButton>
            <GlassButton appearance="game" onClick={() => setAction("report")}>
              Report link
            </GlassButton>
          </div>
        </section>
      )}
    </GameCardShell>
  );
}
