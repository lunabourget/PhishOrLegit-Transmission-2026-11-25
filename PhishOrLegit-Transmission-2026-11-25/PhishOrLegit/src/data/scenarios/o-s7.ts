import { scenarioSchema } from "@/domain/scenarios/schema";

export const oS7Scenario = scenarioSchema.parse({
  id: "O-S7",
  contentVersion: "cards-v9",
  difficulty: "orange",
  family: "inspect",
  channel: "sms",
  verdict: "PHISH",
  sender: "EventTickets",
  content:
    "Your concert refund is ready. Confirm your card here: eventtickets-refund.help/claim",
  hotspots: [
    {
      id: "o-s7-refund-domain",
      targetId: "message-link",
      category: "domain",
      explanation:
        "eventtickets-refund.help is not the official EventTickets domain.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "unofficial refund domain",
    "asks for card details",
    "unexpected refund link",
  ],
  explanation:
    "Refunds should go back to the original payment method. Never confirm your card through an unexpected link.",
});
