import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS1Scenario = scenarioSchema.parse({
  id: "R-S1",
  contentVersion: "cards-v8",
  difficulty: "red",
  family: "listen",
  channel: "call",
  verdict: "PHISH",
  sender: "Your manager",
  content:
    "It's your manager. I'm boarding a plane. I need you to make an urgent transfer of 9,800 euros to a new supplier. I'll email the details. Don't tell anyone.",
  hotspots: [
    {
      id: "r-s1-transfer-request",
      targetId: "verbal-clue",
      category: "payment-request",
      explanation:
        "The caller demands an urgent, secret money transfer and claims to be your manager.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "urgent money transfer",
    "secrecy",
    "a voice can be faked by AI",
  ],
  explanation:
    "Call your manager back on their usual number before doing anything.",
});
