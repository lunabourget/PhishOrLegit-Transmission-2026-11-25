import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS2Scenario = scenarioSchema.parse({
  id: "O-S2",
  contentVersion: "cards-v8",
  difficulty: "orange",
  family: "inspect",
  channel: "email",
  verdict: "LEGIT",
  sender: "NovaBank <no-reply@novabank.com>",
  subject: "Your new card is on its way",
  content:
    "You can follow the delivery in your NovaBank app or on novabank.com/app.",
  hotspots: [
    {
      id: "o-s2-looks-legit",
      targetId: "looks-legit",
      category: "legit-signal",
      explanation:
        "The sender and link use novabank.com, and the email asks for no sensitive information.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "official sender",
    "official novabank.com link",
    "nothing sensitive requested",
  ],
  explanation:
    "Everything points to novabank.com and nothing is asked, so the email is legitimate.",
});
