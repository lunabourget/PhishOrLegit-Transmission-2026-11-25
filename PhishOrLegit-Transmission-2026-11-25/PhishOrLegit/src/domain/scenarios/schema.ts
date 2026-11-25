import { z } from "zod";

export const cardIdSchema = z.string().regex(/^[GOR]-S[1-7]$/, {
  message: "Scan card IDs use the form G-S1, O-S3 or R-S5.",
});

export const linkIdSchema = z.string().regex(/^(?:L0[1-9]|L10)$/, {
  message: "LINK IDs use the form L01 through L10.",
});

export const difficultySchema = z.enum(["green", "orange", "red"]);
export const verdictSchema = z.enum(["PHISH", "LEGIT"]);
export const channelSchema = z.enum(["email", "sms", "call"]);
export const scenarioFamilySchema = z.enum(["inspect", "listen", "link"]);

export const clueCategorySchema = z.enum([
  "sender",
  "domain",
  "link",
  "urgency",
  "credential-request",
  "payment-request",
  "attachment",
  "social-engineering",
  "legit-signal",
]);

export const hotspotSchema = z.object({
  id: z.string().min(1),
  targetId: z.string().min(1),
  category: clueCategorySchema,
  explanation: z.string().min(1),
  minimumCoverage: z.number().min(0.1).max(1).default(0.55),
});

export const scenarioSchema = z.object({
  id: cardIdSchema,
  contentVersion: z.string().min(1),
  difficulty: difficultySchema,
  family: scenarioFamilySchema,
  channel: channelSchema,
  verdict: verdictSchema,
  sender: z.string().min(1),
  subject: z.string().optional(),
  content: z.string().min(1),
  hotspots: z.array(hotspotSchema),
  acceptedClues: z.array(z.string().min(1)).min(1),
  explanation: z.string().min(1),
});

export type CardId = z.infer<typeof cardIdSchema>;
export type LinkId = z.infer<typeof linkIdSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Verdict = z.infer<typeof verdictSchema>;
export type Channel = z.infer<typeof channelSchema>;
export type ScenarioFamily = z.infer<typeof scenarioFamilySchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
