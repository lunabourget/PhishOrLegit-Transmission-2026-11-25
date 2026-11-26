"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { DeviceCanvas } from "@/components/layout/device-canvas";
import type { Difficulty } from "@/domain/scenarios/schema";
import { publicHomeUrl, publicPath } from "@/lib/public-path";

import styles from "./scan-card-shell.module.css";

const difficultyLabels: Record<Difficulty, string> = {
  green: "EASY",
  orange: "MEDIUM",
  red: "HARD",
};

const framePaths = {
  green: "/board-style/frames/frame-corners-green.svg",
  orange: "/board-style/frames/frame-corners-orange.svg",
  red: "/board-style/frames/frame-corners-red.svg",
} as const satisfies Record<Difficulty, `/${string}`>;

type ScanCardShellProps = {
  backLabel: string;
  channel: string;
  children: ReactNode;
  difficulty: Difficulty;
  scenarioId: string;
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={styles.difficultyBadge} data-difficulty={difficulty}>
      {difficultyLabels[difficulty]}
    </span>
  );
}

export function ScanCardShell({
  backLabel,
  channel,
  children,
  difficulty,
  scenarioId,
}: ScanCardShellProps) {
  return (
    <DeviceCanvas>
      <div className={`screen ${styles.screen}`} data-difficulty={difficulty}>
        <div className={styles.scroller}>
          <article
            className={styles.card}
            data-difficulty={difficulty}
            data-testid="scan-card-shell"
            style={{
              backgroundImage: `url("${publicPath("/board-style/backgrounds/scan-card-bg.svg")}")`,
            }}
          >
            <Image
              alt=""
              aria-hidden="true"
              className={styles.cornerFrame}
              fill
              loading="eager"
              sizes="(max-width: 43.75rem) 100vw, 402px"
              src={publicPath(framePaths[difficulty])}
            />
            <header className={styles.cardHeader}>
              <button
                aria-label={backLabel}
                className={styles.backButton}
                onClick={() => window.location.assign(publicHomeUrl)}
                type="button"
              >
                <span aria-hidden="true" className={styles.backArrow}>
                  ←
                </span>
                <span>BACK</span>
              </button>
              <div className={styles.cardIdentity}>
                <span className={styles.scenarioId}>{scenarioId}</span>
                <DifficultyBadge difficulty={difficulty} />
              </div>
            </header>
            <p className={styles.gameTitle}>
              <span>PHISH</span>
              <span className={styles.gameTitleJoin}>OR</span>
              <span className={styles.gameTitleLegit}>LEGIT?</span>
            </p>
            <p className={styles.channelLabel}>{channel} · TRAINING CARD</p>
            <div className={styles.cardContent}>{children}</div>
          </article>
        </div>
      </div>
    </DeviceCanvas>
  );
}
