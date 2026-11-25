import type {
  CardId,
  Channel,
  Difficulty,
  Verdict,
} from "@/domain/scenarios/schema";

export type ScenarioCatalogEntry = {
  channel: Channel;
  difficulty: Difficulty;
  id: CardId;
  verdict: Verdict;
};

export const scenarioCatalog = [
  { id: "G-S1", difficulty: "green", channel: "email", verdict: "PHISH" },
  { id: "G-S2", difficulty: "green", channel: "sms", verdict: "LEGIT" },
  { id: "G-S3", difficulty: "green", channel: "call", verdict: "PHISH" },
  { id: "G-S4", difficulty: "green", channel: "email", verdict: "PHISH" },
  { id: "G-S5", difficulty: "green", channel: "call", verdict: "LEGIT" },
  { id: "G-S6", difficulty: "green", channel: "sms", verdict: "PHISH" },
  { id: "G-S7", difficulty: "green", channel: "email", verdict: "LEGIT" },
  { id: "O-S1", difficulty: "orange", channel: "email", verdict: "PHISH" },
  { id: "O-S2", difficulty: "orange", channel: "email", verdict: "LEGIT" },
  { id: "O-S3", difficulty: "orange", channel: "sms", verdict: "PHISH" },
  { id: "O-S4", difficulty: "orange", channel: "sms", verdict: "PHISH" },
  { id: "O-S5", difficulty: "orange", channel: "call", verdict: "PHISH" },
  { id: "O-S6", difficulty: "orange", channel: "call", verdict: "LEGIT" },
  { id: "O-S7", difficulty: "orange", channel: "sms", verdict: "PHISH" },
  { id: "R-S1", difficulty: "red", channel: "call", verdict: "PHISH" },
  { id: "R-S2", difficulty: "red", channel: "call", verdict: "LEGIT" },
  { id: "R-S3", difficulty: "red", channel: "email", verdict: "PHISH" },
  { id: "R-S4", difficulty: "red", channel: "sms", verdict: "PHISH" },
  { id: "R-S5", difficulty: "red", channel: "sms", verdict: "PHISH" },
  { id: "R-S6", difficulty: "red", channel: "email", verdict: "PHISH" },
  { id: "R-S7", difficulty: "red", channel: "email", verdict: "LEGIT" },
] as const satisfies readonly ScenarioCatalogEntry[];

export function findScenarioCatalogEntry(cardId: string) {
  return scenarioCatalog.find((scenario) => scenario.id === cardId);
}
