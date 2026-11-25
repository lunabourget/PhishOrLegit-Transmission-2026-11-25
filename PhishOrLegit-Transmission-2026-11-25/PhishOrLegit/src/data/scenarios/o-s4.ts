import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS4Scenario = scenarioSchema.parse({
  id: "O-S4",
  contentVersion: "cards-v8",
  difficulty: "orange",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "yourschool IT",
  content:
    "Your school password expires today. Reset it now to keep your access: yourschool-wifi.co/reset",
  hotspots: [
    {
      id: "o-s4-fake-school-link",
      targetId: "message-link",
      category: "link",
      explanation:
        "The link uses yourschool-wifi.co instead of the official yourschool.edu domain.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "link is not yourschool.edu",
    "look-alike domain",
    "urgency: expires today",
  ],
  explanation:
    "Report it. The real school domain is yourschool.edu, not yourschool-wifi.co.",
});
