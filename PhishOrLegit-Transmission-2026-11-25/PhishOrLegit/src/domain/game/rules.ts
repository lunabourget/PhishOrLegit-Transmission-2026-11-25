import { z } from "zod";

import { difficultySchema } from "@/domain/scenarios/schema";

const movementSchema = z.record(difficultySchema, z.number().int().positive());
const penaltySchema = z.record(difficultySchema, z.number().int().max(0));

export const gameRulesSchema = z.object({
  rulesVersion: z.string().min(1),
  source: z.object({
    name: z.string().min(1),
    lastVerifiedAt: z.string().datetime(),
  }),
  cards: z.object({
    movementWhenCorrect: movementSchema,
    movementWhenWrong: penaltySchema,
    spotItBonus: z.literal(1),
    leaderEligibleForClueBonus: z.boolean(),
    scanMeWrongAnswer: z.literal("rickroll"),
  }),
  breach: z.object({
    scope: z.enum(["all-pawns", "all-other-pawns"]),
    movement: z.literal(-1),
  }),
  link: z.object({
    phishingClickMovement: z.literal(-3),
    phishingReportMovement: z.literal(2),
    legitReportMovement: z.literal(0),
  }),
  specialSpacesActivateOn: z.literal("forward-own-turn"),
});

export type GameRules = z.infer<typeof gameRulesSchema>;

export const currentGameRules = gameRulesSchema.parse({
  rulesVersion: "2026-11-25.v9-70-cards.1",
  source: {
    name: "Rules document and explicit user decisions",
    lastVerifiedAt: "2026-11-25T00:00:00.000Z",
  },
  cards: {
    movementWhenCorrect: {
      green: 2,
      orange: 3,
      red: 4,
    },
    movementWhenWrong: {
      green: 0,
      orange: 0,
      red: 0,
    },
    spotItBonus: 1,
    leaderEligibleForClueBonus: false,
    scanMeWrongAnswer: "rickroll",
  },
  breach: {
    scope: "all-other-pawns",
    movement: -1,
  },
  link: {
    phishingClickMovement: -3,
    phishingReportMovement: 2,
    legitReportMovement: 0,
  },
  specialSpacesActivateOn: "forward-own-turn",
});
