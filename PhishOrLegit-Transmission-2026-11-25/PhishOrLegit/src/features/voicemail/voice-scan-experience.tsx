"use client";

import { GlassButton } from "@/components/ios/glass-button";
import { IconButton } from "@/components/ios/icon-button";
import { NavigationBar } from "@/components/ios/navigation-bar";
import { SystemIcon } from "@/components/ios/system-icon";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { useScanReview } from "@/features/review/use-scan-review";

import styles from "./g-s3-experience.module.css";

const waveformHeights = [18, 30, 22, 40, 28, 48, 32, 20, 38, 26, 44, 24];

const difficultyLabels = {
  green: "EASY",
  orange: "MEDIUM",
  red: "HARD",
} as const;

type VoiceScanExperienceProps = {
  callerDetail: string;
  clueCorrection: string;
  clueTitle: string;
  scenario: Scenario;
};

export function VoiceScanExperience({
  callerDetail,
  clueCorrection,
  clueTitle,
  scenario,
}: VoiceScanExperienceProps) {
  const review = useScanReview(scenario.verdict);

  return (
    <DeviceCanvas>
      <div className={"screen " + styles.screen}>
        <NavigationBar
          leading={<IconButton icon="back" label="Back to Recents" />}
          title="Voicemail"
          trailing={<IconButton icon="ellipsis" label="Call details" />}
        />

        <div className={"scroll-content " + styles.content}>
          <div className={styles.contextRow}>
            <span
              className={styles.difficultyBadge}
              data-difficulty={scenario.difficulty}
            >
              {scenario.id} · {difficultyLabels[scenario.difficulty]}
            </span>
            <span className={styles.contextHint}>Sound on</span>
          </div>

          <section aria-label="Voice message" className={styles.callCard}>
            <div className={styles.callerIcon}>
              <SystemIcon name="phone" size={32} />
            </div>
            <span className={styles.callType}>Incoming voice message</span>
            <h1 className={styles.callerName}>{scenario.sender}</h1>
            <span className={styles.callerDetail}>{callerDetail}</span>

            <div aria-hidden="true" className={styles.waveform}>
              {waveformHeights.map((height, index) => (
                <span key={index} style={{ height: height + "%" }} />
              ))}
            </div>

            <button className={styles.pendingAudio} disabled type="button">
              <SystemIcon name="phone" size={20} />
              Audio file pending
            </button>

            <details className={styles.transcript} open>
              <summary>Accessible transcript</summary>
              <p>{scenario.content}</p>
            </details>
          </section>

          <div className={styles.panelSpacing}>
            <ScanReviewPanel
              answer={scenario.verdict}
              beginLabel="We listened and voted"
              clueBody="Say the clue aloud to your group before revealing the answer."
              clueContent={
                <div className={styles.clueActions}>
                  <GlassButton
                    onClick={() => review.finishClue(true)}
                    prominence="primary"
                  >
                    We named the clue
                  </GlassButton>
                  <GlassButton onClick={() => review.finishClue(false)}>
                    Reveal the clue
                  </GlassButton>
                </div>
              }
              clueCorrect={review.clueCorrect}
              clueCorrection={<p>{clueCorrection}</p>}
              clueTitle={clueTitle}
              difficulty={scenario.difficulty}
              explanation={scenario.explanation}
              investigateBody="Listen to the call or read its transcript, then vote with your physical PHISH or LEGIT card."
              onBeginVote={review.beginVote}
              onRestart={review.restart}
              onVote={review.chooseVote}
              phase={review.phase}
              restartLabel="Review the call"
              voteCorrect={review.voteCorrect}
            />
          </div>
        </div>
      </div>
    </DeviceCanvas>
  );
}
