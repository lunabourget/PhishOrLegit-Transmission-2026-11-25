import { describe, expect, it } from "vitest";

import { resolveCardOutcome } from "./resolve-card-outcome";

describe("resolveCardOutcome", () => {
  it("moves by the configured difficulty value", () => {
    expect(resolveCardOutcome({ correct: true, difficulty: "red" })).toEqual({
      bonusMovement: 0,
      movement: 4,
      playsRickroll: false,
    });
  });

  it("adds the Spot it bonus for an eligible player", () => {
    expect(
      resolveCardOutcome({
        correct: true,
        difficulty: "orange",
        scanMe: true,
        spotItCorrect: true,
      }),
    ).toEqual({ bonusMovement: 1, movement: 4, playsRickroll: false });
  });

  it("does not award the clue bonus to the leader", () => {
    expect(
      resolveCardOutcome({
        correct: true,
        difficulty: "green",
        isLeader: true,
        scanMe: true,
        spotItCorrect: true,
      }),
    ).toEqual({ bonusMovement: 0, movement: 2, playsRickroll: false });
  });

  it("plays the rickroll after a wrong Scan me answer", () => {
    expect(
      resolveCardOutcome({
        correct: false,
        difficulty: "green",
        scanMe: true,
      }),
    ).toEqual({ bonusMovement: 0, movement: 0, playsRickroll: true });
  });

  it("keeps every pawn in place after a wrong normal answer", () => {
    expect(
      resolveCardOutcome({ correct: false, difficulty: "orange" }),
    ).toEqual({ bonusMovement: 0, movement: 0, playsRickroll: false });
    expect(resolveCardOutcome({ correct: false, difficulty: "red" })).toEqual({
      bonusMovement: 0,
      movement: 0,
      playsRickroll: false,
    });
  });
});
