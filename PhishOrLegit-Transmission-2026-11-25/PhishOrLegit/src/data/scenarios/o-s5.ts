import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS5Scenario = scenarioSchema.parse({
  id: "O-S5",
  contentVersion: "cards-v8",
  difficulty: "orange",
  family: "listen",
  channel: "call",
  verdict: "PHISH",
  sender: "NovaBank fraud team",
  content:
    "Hello, this is Mark from the NovaBank fraud team. We blocked a suspicious payment. To cancel it, please tell me the code you just received by SMS.",
  hotspots: [
    {
      id: "o-s5-sms-code-request",
      targetId: "verbal-clue",
      category: "credential-request",
      explanation: "The caller asks for a one-time code received by SMS.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: ["asks for an SMS code", "vishing", "creates panic"],
  explanation:
    "A bank never asks for your SMS code. Hang up and call the number on your card.",
});
