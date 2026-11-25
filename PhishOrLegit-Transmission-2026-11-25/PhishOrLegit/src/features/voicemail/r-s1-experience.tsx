import { rS1Scenario } from "@/data/scenarios/r-s1";

import { VoiceScanExperience } from "./voice-scan-experience";

export function RS1Experience() {
  return (
    <VoiceScanExperience
      callerDetail="AI voice · Claimed manager"
      clueCorrection="The caller creates urgency, demands secrecy, and asks for a large money transfer. Call your manager back on their usual number."
      clueTitle="Name the voice clues"
      scenario={rS1Scenario}
    />
  );
}
