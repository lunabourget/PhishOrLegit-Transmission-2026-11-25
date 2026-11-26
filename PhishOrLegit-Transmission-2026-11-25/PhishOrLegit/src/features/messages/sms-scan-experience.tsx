"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { GameCardShell } from "@/components/game/game-card-shell";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { useScanReview } from "@/features/review/use-scan-review";

import styles from "./g-s2-experience.game.module.css";

type SmsScanExperienceProps = {
  avatarLabel: string;
  clueCorrection: string;
  clueMode: "legit" | "link" | "request";
  evidenceText?: string;
  linkText?: string;
  messageLead: string;
  scenario: Scenario;
};

export function SmsScanExperience({
  avatarLabel,
  clueCorrection,
  clueMode,
  evidenceText,
  linkText,
  messageLead,
  scenario,
}: SmsScanExperienceProps) {
  const review = useScanReview(scenario.verdict);
  const [evidenceSelected, setEvidenceSelected] = useState(false);
  const [notice, setNotice] = useState("");
  const canSelectEvidence = review.phase === "clue" && clueMode !== "legit";
  const selectableText = linkText ?? evidenceText;

  function restart() {
    review.restart();
    setEvidenceSelected(false);
    setNotice("");
  }

  return (
    <GameCardShell
      backLabel="Back to Messages"
      channel="TEXT MESSAGE"
      difficulty={scenario.difficulty}
      kind="scan"
      scenarioId={scenario.id}
    >
      <section
        aria-label="Text message conversation"
        className={styles.conversation}
      >
        <header className={styles.contactHeader}>
          <div aria-hidden="true" className={styles.avatar}>
            {avatarLabel}
          </div>
          <div>
            <h1 className={styles.contactName}>{scenario.sender}</h1>
            <span className={styles.contactDetail}>Text message</span>
          </div>
        </header>

        <div className={styles.timeline}>
          <span className={styles.timestamp}>Today 9:41</span>
          <div className={styles.incomingBubble}>
            {messageLead}
            {selectableText ? (
              <button
                aria-pressed={evidenceSelected}
                className={
                  (clueMode === "link"
                    ? styles.messageLink
                    : styles.messageRequest) +
                  (evidenceSelected ? " " + styles.evidenceSelected : "")
                }
                data-testid={
                  clueMode === "link" ? "message-link" : "message-request"
                }
                onClick={() => {
                  if (canSelectEvidence) {
                    setEvidenceSelected(true);
                  } else {
                    setNotice(
                      clueMode === "link"
                        ? "Link disabled. This training simulation never opens risky destinations."
                        : "Read this request carefully before you vote.",
                    );
                  }
                }}
                type="button"
              >
                {selectableText}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <p aria-live="polite" className={styles.notice}>
        {notice}
      </p>

      <ScanReviewPanel
        answer={scenario.verdict}
        beginLabel="We voted on the board"
        clueBody={
          clueMode === "legit"
            ? "There may be no fake detail. Choose the option that best matches this message."
            : clueMode === "link"
              ? "Tap the exact link in the message that exposes the scam, then check your clue."
              : "Tap the exact request in the message that exposes the scam, then check your clue."
        }
        clueContent={
          clueMode === "legit" ? (
            <div className={styles.clueActions}>
              <GlassButton
                appearance="game"
                onClick={() => review.finishClue(true)}
                prominence="primary"
              >
                Looks legit
              </GlassButton>
              <GlassButton
                appearance="game"
                onClick={() => review.finishClue(false)}
              >
                Something looks fake
              </GlassButton>
            </div>
          ) : (
            <GlassButton
              appearance="game"
              disabled={!evidenceSelected}
              onClick={() => review.finishClue(evidenceSelected)}
              prominence="primary"
            >
              Check my clue
            </GlassButton>
          )
        }
        clueCorrect={review.clueCorrect}
        clueCorrection={<p>{clueCorrection}</p>}
        clueTitle={
          clueMode === "legit"
            ? "Spot it or clear it"
            : clueMode === "link"
              ? "Spot the fake link"
              : "Spot the dangerous request"
        }
        difficulty={scenario.difficulty}
        explanation={scenario.explanation}
        contextInstruction="Read the message carefully, then vote on the board."
        onBeginVote={() => {
          setNotice("");
          review.beginVote();
        }}
        onRestart={restart}
        onVote={review.chooseVote}
        phase={review.phase}
        restartLabel="Review the text"
        voteCorrect={review.voteCorrect}
      />
    </GameCardShell>
  );
}
