"use client";

import type { ReactNode } from "react";

import { SystemIcon } from "@/components/ios/system-icon";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import { currentGameRules } from "@/domain/game/rules";
import type { Difficulty } from "@/domain/scenarios/schema";
import { publicHomeUrl } from "@/lib/public-path";

import styles from "./game-card-shell.module.css";

const difficultyLabels: Record<Difficulty, string> = {
  green: "EASY",
  orange: "MEDIUM",
  red: "HARD",
};

type SharedProps = {
  backLabel: string;
  channel: string;
  children: ReactNode;
  scenarioId: string;
};

type ScanGameCardProps = SharedProps & {
  kind: "scan";
  difficulty: Difficulty;
};

type LinkGameCardProps = SharedProps & {
  kind: "link";
};

type GameCardShellProps = ScanGameCardProps | LinkGameCardProps;

export function GameCardShell(props: GameCardShellProps) {
  const { backLabel, channel, children, scenarioId } = props;
  const accent = props.kind === "link" ? "link" : props.difficulty;
  const movement =
    props.kind === "scan"
      ? currentGameRules.cards.movementWhenCorrect[props.difficulty]
      : null;
  const identityType =
    props.kind === "link" ? "LINK" : difficultyLabels[props.difficulty];

  return (
    <DeviceCanvas>
      <div className={`screen ${styles.screen}`}>
        <div className={styles.scroller}>
          <article
            className={styles.card}
            data-accent={accent}
            data-testid="game-card-shell"
          >
            <div aria-hidden="true" className={styles.cornerFrame}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <header className={styles.cardHeader}>
              <button
                aria-label={backLabel}
                className={styles.backButton}
                onClick={() => window.location.assign(publicHomeUrl)}
                type="button"
              >
                <SystemIcon name="back" size={22} />
              </button>
              <div className={styles.cardIdentity}>
                <p className={styles.identityLine}>
                  <span className={styles.kindLabel}>{identityType}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{scenarioId}</span>
                </p>
                <p className={styles.channel}>{channel}</p>
              </div>
              {movement !== null ? (
                <strong
                  aria-label={`Move forward ${movement} spaces for a correct answer`}
                  className={styles.movement}
                >
                  +{movement}
                </strong>
              ) : null}
            </header>
            <div className={styles.cardContent}>{children}</div>
          </article>
        </div>
      </div>
    </DeviceCanvas>
  );
}
