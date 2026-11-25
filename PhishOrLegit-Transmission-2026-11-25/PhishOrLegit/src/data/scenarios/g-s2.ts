import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS2Scenario = scenarioSchema.parse({
  id: "G-S2",
  contentVersion: "cards-v8",
  difficulty: "green",
  family: "inspect",
  channel: "sms",
  verdict: "LEGIT",
  sender: "FriendSpace",
  content:
    "FriendSpace: 482913 is your login code. Never share this code with anyone, even FriendSpace staff.",
  hotspots: [
    {
      id: "g-s2-looks-legit",
      targetId: "looks-legit",
      category: "legit-signal",
      explanation:
        "Nothing is fake: there is no link or request, and the message warns you not to share the code.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "no link",
    "nothing asked",
    "warns you not to share the code",
  ],
  explanation:
    "This is a real login code you asked for. Never give the code to anyone.",
});
