import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS4Scenario = scenarioSchema.parse({
  id: "R-S4",
  contentVersion: "cards-v8",
  difficulty: "red",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "NovaBank",
  content:
    "NovaBank: a new device was added to your account. Not you? Secure your account now: novabank.com-secure.help/device",
  hotspots: [
    {
      id: "r-s4-real-domain",
      targetId: "message-link",
      category: "domain",
      explanation:
        "The real domain is com-secure.help, not novabank.com, even inside a familiar SMS thread.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "real domain is com-secure.help",
    "urgent security warning",
    "sender name can be spoofed",
  ],
  explanation:
    "An SMS can appear in your real bank thread. Read the domain just before the first slash.",
});
