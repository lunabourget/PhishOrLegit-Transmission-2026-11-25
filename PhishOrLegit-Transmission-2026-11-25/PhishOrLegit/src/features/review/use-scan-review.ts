"use client";

import { useState } from "react";

import type { Verdict } from "@/domain/scenarios/schema";

export type ScanReviewPhase = "message" | "vote" | "clue" | "result";

export function useScanReview(correctVerdict: Verdict) {
  const [phase, setPhase] = useState<ScanReviewPhase>("message");
  const [vote, setVote] = useState<Verdict | null>(null);
  const [clueCorrect, setClueCorrect] = useState(false);

  const voteCorrect = vote === correctVerdict;

  function beginVote() {
    setPhase("vote");
  }

  function chooseVote(nextVote: Verdict) {
    setVote(nextVote);
    setPhase(nextVote === correctVerdict ? "clue" : "result");
  }

  function finishClue(correct: boolean) {
    setClueCorrect(correct);
    setPhase("result");
  }

  function restart() {
    setPhase("message");
    setVote(null);
    setClueCorrect(false);
  }

  return {
    beginVote,
    chooseVote,
    clueCorrect,
    finishClue,
    phase,
    restart,
    vote,
    voteCorrect,
  };
}
