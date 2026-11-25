import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS1Scenario = scenarioSchema.parse({
  id: "G-S1",
  contentVersion: "cards-v8",
  difficulty: "green",
  family: "inspect",
  channel: "email",
  verdict: "PHISH",
  sender: "StreamFlix Team <streamflix.support@gmail.com>",
  subject: "Your account is suspended!!",
  content:
    "We could not take you payment. Click here to update your card today.",
  hotspots: [
    {
      id: "g-s1-sender-address",
      targetId: "sender-address",
      category: "sender",
      explanation:
        "The message uses a free Gmail address instead of streamflix.com.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "free Gmail address",
    "spelling mistake: take you payment",
    "urgency",
  ],
  explanation:
    "A real company writes from its own domain, streamflix.com, not from Gmail.",
});
