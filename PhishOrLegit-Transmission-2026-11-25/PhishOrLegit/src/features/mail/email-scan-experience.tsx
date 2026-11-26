"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { GameCardShell } from "@/components/game/game-card-shell";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { useScanReview } from "@/features/review/use-scan-review";

import styles from "./g-s1-experience.game.module.css";

type EvidenceId = "sender-address" | "subject" | "message" | "action";

type EmailScanExperienceProps = {
  actionDetail?: string;
  actionLabel: string;
  avatarLabel: string;
  body: string;
  correction: string;
  correctionLabel?: string;
  correctEvidence?: EvidenceId;
  clueMode?: "sender" | "legit";
  scenario: Scenario;
  senderAddress: string;
  senderName: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function EmailScanExperience({
  actionDetail,
  actionLabel,
  avatarLabel,
  body,
  correction,
  correctionLabel = "The strongest detail was the sender address",
  correctEvidence = "sender-address",
  clueMode = "sender",
  scenario,
  senderAddress,
  senderName,
}: EmailScanExperienceProps) {
  const review = useScanReview(scenario.verdict);
  const [senderExpanded, setSenderExpanded] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceId | null>(
    null,
  );
  const [notice, setNotice] = useState("");

  const showAddress =
    senderExpanded || review.phase === "clue" || review.phase === "result";
  const canSelectEvidence = review.phase === "clue" && clueMode === "sender";

  function inspectSender() {
    if (canSelectEvidence) {
      setSelectedEvidence("sender-address");
      return;
    }

    setSenderExpanded((expanded) => !expanded);
    setNotice(
      senderExpanded
        ? "Sender details hidden."
        : "Sender details revealed. Check the full address carefully.",
    );
  }

  function selectEvidence(evidence: EvidenceId) {
    if (canSelectEvidence) {
      setSelectedEvidence(evidence);
    }
  }

  function restart() {
    review.restart();
    setSenderExpanded(false);
    setSelectedEvidence(null);
    setNotice("");
  }

  return (
    <GameCardShell
      backLabel="Back to Inbox"
      channel="EMAIL"
      difficulty={scenario.difficulty}
      kind="scan"
      scenarioId={scenario.id}
    >
      <article aria-label="Email message" className={styles.mailCard}>
        <div className={styles.mailHeader}>
          <div aria-hidden="true" className={styles.avatar}>
            {avatarLabel}
          </div>
          <button
            aria-expanded={showAddress}
            className={classNames(
              styles.senderButton,
              selectedEvidence === "sender-address" && styles.evidenceSelected,
            )}
            data-testid="sender-address"
            onClick={inspectSender}
            type="button"
          >
            <span className={styles.senderName}>{senderName}</span>
            {showAddress ? (
              <span className={styles.senderAddress}>{senderAddress}</span>
            ) : (
              <span className={styles.inspectLabel}>Tap to inspect sender</span>
            )}
          </button>
          <span className={styles.messageTime}>9:41</span>
        </div>

        {canSelectEvidence ? (
          <button
            className={classNames(
              styles.subjectButton,
              selectedEvidence === "subject" && styles.evidenceSelected,
            )}
            onClick={() => selectEvidence("subject")}
            type="button"
          >
            {scenario.subject}
          </button>
        ) : (
          <h1 className={styles.subject}>{scenario.subject}</h1>
        )}

        {canSelectEvidence ? (
          <button
            className={classNames(
              styles.messageButton,
              selectedEvidence === "message" && styles.evidenceSelected,
            )}
            onClick={() => selectEvidence("message")}
            type="button"
          >
            {body}
          </button>
        ) : (
          <p className={styles.message}>{body}</p>
        )}

        <button
          className={classNames(
            styles.fakeLink,
            selectedEvidence === "action" && styles.evidenceSelected,
          )}
          onClick={() => {
            if (canSelectEvidence) {
              selectEvidence("action");
            } else {
              setNotice(
                "Link disabled. This training simulation never opens risky destinations.",
              );
            }
          }}
          type="button"
        >
          {actionLabel}
        </button>
        {actionDetail && (canSelectEvidence || review.phase === "result") ? (
          <span className={styles.actionDetail}>Opens: {actionDetail}</span>
        ) : null}
      </article>

      <p aria-live="polite" className={styles.notice}>
        {notice}
      </p>

      <ScanReviewPanel
        answer={scenario.verdict}
        beginLabel="We voted on the board"
        clueBody={
          clueMode === "legit"
            ? "There may be no fake detail. Choose the option that best matches this email."
            : "Tap the exact detail in the email that exposes the scam, then check your clue."
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
              disabled={!selectedEvidence}
              onClick={() =>
                review.finishClue(selectedEvidence === correctEvidence)
              }
              prominence="primary"
            >
              Check my clue
            </GlassButton>
          )
        }
        clueCorrect={review.clueCorrect}
        clueCorrection={
          <p>
            {clueMode === "legit" ? (
              correction
            ) : (
              <>
                {correctionLabel}: <strong>{correction}</strong>.
              </>
            )}
          </p>
        }
        clueTitle={
          clueMode === "legit" ? "Spot it or clear it" : "Spot the fake detail"
        }
        difficulty={scenario.difficulty}
        explanation={scenario.explanation}
        contextInstruction="Inspect the email, then vote on the board."
        onBeginVote={() => {
          setNotice("");
          review.beginVote();
        }}
        onRestart={restart}
        onVote={review.chooseVote}
        phase={review.phase}
        restartLabel="Review the email"
        voteCorrect={review.voteCorrect}
      />
    </GameCardShell>
  );
}
