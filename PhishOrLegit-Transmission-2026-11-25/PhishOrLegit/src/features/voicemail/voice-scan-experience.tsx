"use client";

import { GlassButton } from "@/components/ios/glass-button";
import { SystemIcon } from "@/components/ios/system-icon";
import { findVoiceScript } from "@/data/scenarios/voice-scripts";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { ScanCardShell } from "@/features/scan/scan-card-shell";
import { useScanReview } from "@/features/review/use-scan-review";
import { publicPath } from "@/lib/public-path";

import styles from "./g-s3-experience.module.css";

const waveformHeights = [18, 30, 22, 40, 28, 48, 32, 20, 38, 26, 44, 24];

type VoiceScanExperienceProps = {
  callerDetail?: string;
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
  const voiceScript = findVoiceScript(scenario.id);
  const review = useScanReview(scenario.verdict);

  if (!voiceScript) {
    throw new Error(`Missing voice script for call scenario ${scenario.id}`);
  }

  return (
    <ScanCardShell
      backLabel="Back to Recents"
      channel="VOICE MESSAGE"
      difficulty={scenario.difficulty}
      scenarioId={scenario.id}
    >
      <section aria-label="Voice message" className={styles.callCard}>
        <div className={styles.callerIcon}>
          <SystemIcon name="phone" size={28} />
        </div>
        <span className={styles.callType}>Incoming voice message</span>
        <h1 className={styles.callerName}>{scenario.sender}</h1>
        {callerDetail ? (
          <span className={styles.callerDetail}>{callerDetail}</span>
        ) : null}

        <div aria-hidden="true" className={styles.waveform}>
          {waveformHeights.map((height, index) => (
            <span key={index} style={{ height: height + "%" }} />
          ))}
        </div>

        <audio
          aria-label={`Call audio for ${scenario.id}`}
          className={styles.audioPlayer}
          controls
          preload="none"
        >
          <source src={publicPath(voiceScript.assetPath)} type="audio/mp4" />
          Your browser does not support audio playback.
        </audio>

        <details className={styles.transcript}>
          <summary>Reveal transcript hint</summary>
          <p>{voiceScript.transcript}</p>
        </details>
      </section>

      <ScanReviewPanel
        answer={scenario.verdict}
        beginLabel="We listened and voted"
        clueBody="Say the clue aloud to your group before revealing the answer."
        clueContent={
          <div className={styles.clueActions}>
            <GlassButton
              appearance="board"
              onClick={() => review.finishClue(true)}
              prominence="primary"
            >
              We named the clue
            </GlassButton>
            <GlassButton
              appearance="board"
              onClick={() => review.finishClue(false)}
            >
              Reveal the clue
            </GlassButton>
          </div>
        }
        clueCorrect={review.clueCorrect}
        clueCorrection={<p>{clueCorrection}</p>}
        clueTitle={clueTitle}
        difficulty={scenario.difficulty}
        explanation={scenario.explanation}
        investigateBody="Listen to the call, then vote with your physical PHISH or LEGIT card. Reveal the transcript hint only if needed."
        onBeginVote={review.beginVote}
        onRestart={review.restart}
        onVote={review.chooseVote}
        phase={review.phase}
        restartLabel="Review the call"
        voteCorrect={review.voteCorrect}
      />
    </ScanCardShell>
  );
}
