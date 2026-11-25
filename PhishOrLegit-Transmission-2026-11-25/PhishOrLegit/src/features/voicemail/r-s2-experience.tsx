import { rS2Scenario } from "@/data/scenarios/r-s2";

import { VoiceScanExperience } from "./voice-scan-experience";

export function RS2Experience() {
  return (
    <VoiceScanExperience
      clueCorrection="The caller gives information only. They ask for no link, money, code, or sensitive data."
      clueTitle="Name the safety clues"
      scenario={rS2Scenario}
    />
  );
}
