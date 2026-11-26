"use client";

import { GlassButton } from "@/components/ios/glass-button";
import { GameCardShell } from "@/components/game/game-card-shell";
import { findVoiceScript } from "@/data/scenarios/voice-scripts";
import type { Scenario } from "@/domain/scenarios/schema";
import { ScanReviewPanel } from "@/features/review/scan-review-panel";
import { useScanReview } from "@/features/review/use-scan-review";
import { publicPath } from "@/lib/public-path";

import { GameAudioPlayer } from "./game-audio-player";
import styles from "./g-s3-experience.game.module.css";

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
    <GameCardShell
      backLabel="Back to Recents"
      channel="VOICE MESSAGE"
      difficulty={scenario.difficulty}
      kind="scan"
      scenarioId={scenario.id}
    >
      <section aria-label="Voice message" className={styles.callCard}>
        <p className={styles.callType}>VOICE MESSAGE</p>
        <h1 className={styles.callerName}>{scenario.sender}</h1>
        {callerDetail ? (
          <span className={styles.callerDetail}>{callerDetail}</span>
        ) : null}
        <GameAudioPlayer
          key={scenario.id}
          label={`Call recording for ${scenario.id}`}
          src={publicPath(voiceScript.assetPath)}
        />
        <details className={styles.transcript}>
          <summary>Read transcript</summary>
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
              appearance="game"
              onClick={() => review.finishClue(true)}
              prominence="primary"
            >
              We named the clue
            </GlassButton>
            <GlassButton
              appearance="game"
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
        contextInstruction="Listen carefully, then vote on the board."
        onBeginVote={review.beginVote}
        onRestart={review.restart}
        onVote={review.chooseVote}
        phase={review.phase}
        restartLabel="Review the call"
        voteCorrect={review.voteCorrect}
      />
    </GameCardShell>
  );
}
