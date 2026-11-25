import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS4Scenario = scenarioSchema.parse({
  id: "G-S4",
  contentVersion: "cards-v8",
  difficulty: "green",
  family: "inspect",
  channel: "email",
  verdict: "PHISH",
  sender: "ShopNow Prizes <prize@sh0pnow-gifts.win>",
  subject: "You are our 1,000,000th customer!",
  content: "Claim your free TV now, the offer ends tonight!",
  hotspots: [
    {
      id: "g-s4-sender-domain",
      targetId: "sender-address",
      category: "domain",
      explanation:
        "The sender uses sh0pnow-gifts.win, with a zero instead of the letter o, rather than shopnow.com.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "fake prize",
    "look-alike domain",
    "urgency: offer ends tonight",
  ],
  explanation:
    "This is a prize you never entered for, sent from a fake look-alike domain. Report it.",
});
