import { gS3Scenario } from "@/data/scenarios/g-s3";

import { VoiceScanExperience } from "./voice-scan-experience";

export function GS3Experience() {
  return (
    <VoiceScanExperience
      callerDetail="Automated call"
      clueCorrection="The caller asks for your card number by phone to pay a small delivery fee."
      clueTitle="Name the voice clue"
      scenario={gS3Scenario}
    />
  );
}
