"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { SystemIcon } from "@/components/ios/system-icon";
import { currentGameRules } from "@/domain/game/rules";
import type { Difficulty, Verdict } from "@/domain/scenarios/schema";

import type { ScanReviewPhase } from "./use-scan-review";
import styles from "./scan-review-panel.module.css";

type ScanReviewPanelProps = {
  answer: Verdict;
  beginLabel: string;
  clueBody: string;
  clueContent: ReactNode;
  clueCorrect: boolean;
  clueCorrection: ReactNode;
  clueTitle: string;
  difficulty: Difficulty;
  explanation: string;
  investigateBody: string;
  onBeginVote: () => void;
  onRestart: () => void;
  onVote: (vote: Verdict) => void;
  phase: ScanReviewPhase;
  restartLabel: string;
  voteCorrect: boolean;
};

function verdictLabel(verdict: Verdict) {
  return verdict === "PHISH" ? "phishing" : "legitimate";
}

export function ScanReviewPanel({
  answer,
  beginLabel,
  clueBody,
  clueContent,
  clueCorrect,
  clueCorrection,
  clueTitle,
  difficulty,
  explanation,
  investigateBody,
  onBeginVote,
  onRestart,
  onVote,
  phase,
  restartLabel,
  voteCorrect,
}: ScanReviewPanelProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.22 };
  const baseMovement = currentGameRules.cards.movementWhenCorrect[difficulty];
  const wrongMovement = currentGameRules.cards.movementWhenWrong[difficulty];
  const answerLabel = verdictLabel(answer);

  return (
    <AnimatePresence mode="wait">
      {phase === "message" ? (
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className={styles.actionPanel}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          key="message-actions"
          transition={transition}
        >
          <div>
            <h2 className={styles.panelTitle}>Investigate first</h2>
            <p className={styles.panelBody}>{investigateBody}</p>
          </div>
          <GlassButton onClick={onBeginVote} prominence="primary">
            {beginLabel}
          </GlassButton>
        </motion.section>
      ) : null}

      {phase === "vote" ? (
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className={styles.decisionPanel}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          key="vote"
          transition={transition}
        >
          <span className={styles.stepLabel}>Your board vote</span>
          <h2 className={styles.panelTitle}>Phish or legit?</h2>
          <div className={styles.voteButtons}>
            <GlassButton
              aria-label="Choose PHISH"
              onClick={() => onVote("PHISH")}
              prominence="destructive"
            >
              PHISH
            </GlassButton>
            <GlassButton
              aria-label="Choose LEGIT"
              onClick={() => onVote("LEGIT")}
              prominence="primary"
            >
              LEGIT
            </GlassButton>
          </div>
        </motion.section>
      ) : null}

      {phase === "clue" ? (
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className={styles.decisionPanel}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          key="clue"
          transition={transition}
        >
          <span className={styles.stepLabel}>Bonus · +1</span>
          <h2 className={styles.panelTitle}>{clueTitle}</h2>
          <p className={styles.panelBody}>{clueBody}</p>
          {clueContent}
        </motion.section>
      ) : null}

      {phase === "result" ? (
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className={styles.resultPanel}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key="result"
          transition={transition}
        >
          <div className={styles.resultIcon} data-correct={voteCorrect}>
            <SystemIcon
              name={voteCorrect ? "checkmark" : "warning"}
              size={28}
            />
          </div>
          <span className={styles.stepLabel}>Answer · {answer}</span>
          <h2 className={styles.resultTitle}>
            {voteCorrect
              ? "Correct. This is " + answerLabel + "."
              : "This one is " + answerLabel + "."}
          </h2>
          <p className={styles.resultExplanation}>{explanation}</p>

          <div className={styles.consequenceList}>
            <div className={styles.consequenceRow}>
              <span>Board movement</span>
              <strong>
                {voteCorrect
                  ? "+" + baseMovement
                  : wrongMovement > 0
                    ? "+" + wrongMovement
                    : String(wrongMovement)}
              </strong>
            </div>
            {voteCorrect ? (
              <div className={styles.consequenceRow}>
                <span>Clue bonus</span>
                <strong>{clueCorrect ? "+1" : "0"}</strong>
              </div>
            ) : (
              <div className={styles.consequenceRow}>
                <span>Feedback</span>
                <strong data-outcome="parody">Play parody</strong>
              </div>
            )}
          </div>

          {voteCorrect && clueCorrect ? (
            <p className={styles.leaderNote}>
              The +1 clue bonus does not apply to the pawn currently in the
              lead.
            </p>
          ) : null}

          {voteCorrect && !clueCorrect ? (
            <div className={styles.clueCorrection}>{clueCorrection}</div>
          ) : null}

          <GlassButton onClick={onRestart}>{restartLabel}</GlassButton>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
