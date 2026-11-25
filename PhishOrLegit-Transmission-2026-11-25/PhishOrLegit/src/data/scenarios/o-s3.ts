import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS3Scenario = scenarioSchema.parse({
  id: "O-S3",
  contentVersion: "cards-v8",
  difficulty: "orange",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "ParcelGo",
  content:
    "ParcelGo: we missed you today! Choose a new delivery time here: parceIgo.com/r/58210",
  hotspots: [
    {
      id: "o-s3-lookalike-link",
      targetId: "message-link",
      category: "link",
      explanation:
        "The link says parceIgo.com with a capital I instead of a lowercase l.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: ["look-alike domain", "parceIgo.com uses a capital I"],
  explanation:
    "Look closely at every letter of the domain. When in doubt, open the official app.",
});
