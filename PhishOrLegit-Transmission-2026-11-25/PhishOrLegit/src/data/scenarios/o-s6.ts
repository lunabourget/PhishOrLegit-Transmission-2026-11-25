import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS6Scenario = scenarioSchema.parse({
  id: "O-S6",
  contentVersion: "cards-v9",
  difficulty: "orange",
  family: "listen",
  channel: "call",
  verdict: "LEGIT",
  sender: "School IT desk",
  content:
    "Hello, this is the school IT desk. The Wi-Fi will be unavailable from six to seven p.m. No action is needed.",
  hotspots: [
    {
      id: "o-s6-information-only",
      targetId: "verbal-clue",
      category: "legit-signal",
      explanation:
        "The caller gives a precise service notice and asks for no action, code, password, or payment.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "no action needed",
    "no password or code requested",
    "specific maintenance time",
  ],
  explanation:
    "This is an informational service notice. The caller does not ask you to reveal or do anything.",
});
