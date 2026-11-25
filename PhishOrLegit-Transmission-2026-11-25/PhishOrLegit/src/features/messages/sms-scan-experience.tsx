"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { IconButton } from "@/components/ios/icon-button";
import { NavigationBar } from "@/components/ios/navigation-bar";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { useScanReview } from "@/features/review/use-scan-review";

import styles from "./g-s2-experience.module.css";

type SmsScanExperienceProps = {
  avatarLabel: string;
  clueCorrection: string;
  clueMode: "legit" | "link" | "request";
  evidenceText?: string;
  linkText?: string;
  messageLead: string;
  scenario: Scenario;
};

const difficultyLabels = {
  green: "EASY",
  orange: "MEDIUM",
  red: "HARD",
} as const;

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
    <DeviceCanvas>
      <div className={"screen " + styles.screen}>
        <NavigationBar
          leading={<IconButton icon="back" label="Back to Messages" />}
          title="Messages"
          trailing={<IconButton icon="ellipsis" label="Conversation details" />}
        />

        <div className={"scroll-content " + styles.content}>
          <div className={styles.contextRow}>
            <span
              className={styles.difficultyBadge}
              data-difficulty={scenario.difficulty}
            >
              {scenario.id} · {difficultyLabels[scenario.difficulty]}
            </span>
            <span className={styles.contextHint}>Training simulation</span>
          </div>

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

          <div className={styles.panelSpacing}>
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
                      onClick={() => review.finishClue(true)}
                      prominence="primary"
                    >
                      Looks legit
                    </GlassButton>
                    <GlassButton onClick={() => review.finishClue(false)}>
                      Something looks fake
                    </GlassButton>
                  </div>
                ) : (
                  <GlassButton
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
              investigateBody="Read the text message, then vote with your physical PHISH or LEGIT card."
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
          </div>
        </div>
      </div>
    </DeviceCanvas>
  );
}
