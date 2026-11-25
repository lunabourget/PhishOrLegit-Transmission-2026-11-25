import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS5Scenario = scenarioSchema.parse({
  id: "G-S5",
  contentVersion: "cards-v8",
  difficulty: "green",
  family: "listen",
  channel: "call",
  verdict: "LEGIT",
  sender: "School front desk",
  content:
    "Hello, this is the front desk of your school. A parcel arrived for you. You can pick it up at reception until six p.m. No need to call back.",
  hotspots: [
    {
      id: "g-s5-information-only",
      targetId: "verbal-clue",
      category: "legit-signal",
      explanation:
        "The caller only gives information and asks for no link, code, money, or callback.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: ["nothing asked", "no link", "no code or money requested"],
  explanation:
    "Ask yourself what the caller wants from you. Here, nothing is requested, so the call is legitimate.",
});
