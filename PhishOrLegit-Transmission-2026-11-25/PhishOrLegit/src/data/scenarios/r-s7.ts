import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS7Scenario = scenarioSchema.parse({
  id: "R-S7",
  contentVersion: "cards-v9",
  difficulty: "red",
  family: "inspect",
  channel: "email",
  verdict: "LEGIT",
  sender: "Brightwave Security <security@brightwave.com>",
  subject: "New sign-in to your account",
  content:
    "If this was not you, open the Brightwave Security page from the intranet. This email contains no link.",
  hotspots: [
    {
      id: "r-s7-safe-instruction",
      targetId: "sender-address",
      category: "legit-signal",
      explanation:
        "The message uses the company domain and tells you to open the intranet yourself instead of following a link.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "official company domain",
    "no sign-in link",
    "open the intranet yourself",
  ],
  explanation:
    "The message asks for no secret and tells you to open the trusted intranet yourself.",
});
