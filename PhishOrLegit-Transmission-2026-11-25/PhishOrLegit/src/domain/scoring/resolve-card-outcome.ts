import { z } from "zod";

import { currentGameRules } from "@/domain/game/rules";
import { difficultySchema } from "@/domain/scenarios/schema";

const cardDecisionSchema = z.object({
  correct: z.boolean(),
  difficulty: difficultySchema,
  isLeader: z.boolean().default(false),
  scanMe: z.boolean().default(false),
  spotItCorrect: z.boolean().default(false),
});

export type CardDecision = z.input<typeof cardDecisionSchema>;

export type CardOutcome = {
  bonusMovement: number;
  movement: number;
  playsRickroll: boolean;
};

export function resolveCardOutcome(input: CardDecision): CardOutcome {
  const decision = cardDecisionSchema.parse(input);
  const { cards } = currentGameRules;

  if (!decision.correct) {
    return {
      bonusMovement: 0,
      movement: cards.movementWhenWrong[decision.difficulty],
      playsRickroll: decision.scanMe,
    };
  }

  const bonusMovement =
    decision.scanMe &&
    decision.spotItCorrect &&
    (!decision.isLeader || cards.leaderEligibleForClueBonus)
      ? cards.spotItBonus
      : 0;

  return {
    bonusMovement,
    movement: cards.movementWhenCorrect[decision.difficulty] + bonusMovement,
    playsRickroll: false,
  };
}
