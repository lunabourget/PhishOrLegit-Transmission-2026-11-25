import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS2Scenario = scenarioSchema.parse({
  id: "R-S2",
  contentVersion: "cards-v8",
  difficulty: "red",
  family: "listen",
  channel: "call",
  verdict: "LEGIT",
  sender: "Brightwave HR",
  content:
    "Hi, it's Sarah from Brightwave HR. Just a reminder: your onboarding training is tomorrow at 10 am in room B2. If you can't come, tell your manager. Have a nice day!",
  hotspots: [
    {
      id: "r-s2-information-only",
      targetId: "verbal-clue",
      category: "legit-signal",
      explanation:
        "The caller gives information and asks for no link, money, code, or sensitive data.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "nothing sensitive asked",
    "no link, money, or code",
    "easy to check with a manager",
  ],
  explanation:
    "An AI-sounding voice is not proof of a scam. Ask what the caller wants from you. Here, nothing.",
});
