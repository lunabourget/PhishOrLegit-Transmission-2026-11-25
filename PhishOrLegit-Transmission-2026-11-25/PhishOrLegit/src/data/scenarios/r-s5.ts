import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS5Scenario = scenarioSchema.parse({
  id: "R-S5",
  contentVersion: "cards-v8",
  difficulty: "red",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "CloudBox",
  content:
    "CloudBox: someone tried to sign in to your account. If it wasn't you, reply with the 6-digit code we just sent you to block them.",
  hotspots: [
    {
      id: "r-s5-code-request",
      targetId: "message-request",
      category: "credential-request",
      explanation:
        "The message asks you to reply with a two-factor authentication code.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: ["asks for a 2FA code", "urgency", "fear of an intruder"],
  explanation:
    "Never share a 2FA code, even to block someone. Change your password in the official app.",
});
