import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS7Scenario = scenarioSchema.parse({
  id: "G-S7",
  contentVersion: "cards-v9",
  difficulty: "green",
  family: "inspect",
  channel: "email",
  verdict: "LEGIT",
  sender: "YourSchool Learning <no-reply@yourschool.edu>",
  subject: "Your science assignment was graded",
  content:
    "Your science assignment has been graded. Open the school learning app to see your feedback.",
  hotspots: [
    {
      id: "g-s7-official-school-domain",
      targetId: "sender-address",
      category: "legit-signal",
      explanation:
        "The sender uses the official yourschool.edu domain and asks you to use the school app.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "official school domain",
    "no password or payment requested",
    "use the school app",
  ],
  explanation:
    "This routine notification uses the official school domain and asks for no sensitive information.",
});
