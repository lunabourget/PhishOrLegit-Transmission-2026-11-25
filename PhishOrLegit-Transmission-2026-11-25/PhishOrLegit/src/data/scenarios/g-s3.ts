import { scenarioSchema } from "@/domain/scenarios/schema";

export const gS3Scenario = scenarioSchema.parse({
  id: "G-S3",
  contentVersion: "cards-v8",
  difficulty: "green",
  family: "listen",
  channel: "call",
  verdict: "PHISH",
  sender: "ParcelGo delivery service",
  content:
    "Hello, this is ParcelGo. Your parcel could not be delivered. Press one and give your card number to pay the two-euro fee.",
  hotspots: [
    {
      id: "g-s3-card-request",
      targetId: "verbal-clue",
      category: "credential-request",
      explanation:
        "The caller asks for your card number to pay a small delivery fee.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "asks for a card number by phone",
    "small delivery fee",
    "vishing",
  ],
  explanation:
    "Delivery companies never ask for your card number by phone. Hang up.",
});
