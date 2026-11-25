import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS6Scenario = scenarioSchema.parse({
  id: "G-S6",
  contentVersion: "cards-v9",
  difficulty: "green",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "School Office",
  content:
    "Your school meal account is empty. Add 5 euros now: school-meals-pay.info/topup",
  hotspots: [
    {
      id: "g-s6-fake-meal-link",
      targetId: "message-link",
      category: "link",
      explanation:
        "The payment link uses school-meals-pay.info instead of the official yourschool.edu domain.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "unofficial payment domain",
    "small urgent payment",
    "not yourschool.edu",
  ],
  explanation:
    "School payments should use the official school portal, not an unknown link.",
});
