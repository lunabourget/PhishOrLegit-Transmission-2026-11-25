import type { CardId, Verdict } from "@/domain/scenarios/schema";

export type VoiceScript = {
  assetPath: `/audio/${string}.m4a`;
  direction: string;
  id: CardId;
  role: string;
  transcript: string;
  verdict: Verdict;
};

export const voiceScriptCatalog = [
  {
    id: "G-S3",
    verdict: "PHISH",
    role: "Fictional ParcelGo automated delivery service",
    direction:
      "Neutral automated service voice. Clear international English, calm pace, slightly impersonal. Do not sound comic or obviously suspicious.",
    transcript:
      "Hello, this is ParcelGo. Your parcel could not be delivered. Press one and give your card number to pay the two-euro fee.",
    assetPath: "/audio/g-s3.m4a",
  },
  {
    id: "G-S5",
    verdict: "LEGIT",
    role: "Fictional school front desk employee",
    direction:
      "Warm adult voice. Clear international English, natural pace, informative and relaxed. No urgency.",
    transcript:
      "Hello, this is the front desk of your school. A parcel arrived for you. You can pick it up at reception until six p.m. No need to call back.",
    assetPath: "/audio/g-s5.m4a",
  },
  {
    id: "O-S5",
    verdict: "PHISH",
    role: "Fictional NovaBank fraud adviser named Mark",
    direction:
      "Professional adult voice. Clear international English, controlled urgency, reassuring but persuasive. Do not make the scam obvious.",
    transcript:
      "Hello, this is Mark from the NovaBank fraud team. We blocked a suspicious payment. To cancel it, please tell me the code you just received by SMS.",
    assetPath: "/audio/o-s5.m4a",
  },
  {
    id: "O-S6",
    verdict: "LEGIT",
    role: "Fictional school IT desk employee",
    direction:
      "Calm adult technical-support voice. Clear international English, natural pace, factual and reassuring. No urgency.",
    transcript:
      "Hello, this is the school IT desk. The Wi-Fi will be unavailable from six to seven p.m. No action is needed.",
    assetPath: "/audio/o-s6.m4a",
  },
  {
    id: "R-S1",
    verdict: "PHISH",
    role: "Fictional Brightwave manager",
    direction:
      "Confident adult corporate voice. Slight travel background feeling, hurried but believable. The voice must be wholly fictional and must not imitate a real person.",
    transcript:
      "It's your manager. I'm boarding a plane. I need you to make an urgent transfer of nine thousand eight hundred euros to a new supplier. I'll email the details. Don't tell anyone.",
    assetPath: "/audio/r-s1.m4a",
  },
  {
    id: "R-S2",
    verdict: "LEGIT",
    role: "Fictional Brightwave HR employee named Sarah",
    direction:
      "Friendly adult corporate voice. Clear international English, natural pace, calm and helpful. No pressure or sales tone.",
    transcript:
      "Hi, it's Sarah from Brightwave HR. Just a reminder: your onboarding training is tomorrow at ten a.m. in room B two. If you can't come, tell your manager. Have a nice day!",
    assetPath: "/audio/r-s2.m4a",
  },
] as const satisfies readonly VoiceScript[];

export function findVoiceScript(cardId: string) {
  return voiceScriptCatalog.find((script) => script.id === cardId);
}
