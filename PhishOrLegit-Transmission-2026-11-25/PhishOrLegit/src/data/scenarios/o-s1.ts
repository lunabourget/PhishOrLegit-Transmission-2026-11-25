import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS1Scenario = scenarioSchema.parse({
  id: "O-S1",
  contentVersion: "cards-v8",
  difficulty: "orange",
  family: "inspect",
  channel: "email",
  verdict: "PHISH",
  sender: "CloudBox Support <support@cloudb0x-mail.com>",
  subject: "Your storage is full",
  content:
    "Upgrade in the next 24 hours or your files will be deleted. Upgrade now.",
  hotspots: [
    {
      id: "o-s1-sender-domain",
      targetId: "sender-address",
      category: "domain",
      explanation:
        "The sender uses cloudb0x-mail.com, with a zero instead of the letter o.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "display name hides a fake address",
    "cloudb0x-mail.com uses a zero",
    "urgency: 24 hours",
  ],
  explanation:
    "Always tap the sender: the name can lie, but the full address exposes the fake domain.",
});
