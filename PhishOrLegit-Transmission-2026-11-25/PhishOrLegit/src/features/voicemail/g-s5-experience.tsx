import { gS5Scenario } from "@/data/scenarios/g-s5";

import { VoiceScanExperience } from "./voice-scan-experience";

export function GS5Experience() {
  return (
    <VoiceScanExperience
      callerDetail="School reception"
      clueCorrection="The caller gives information only. They ask for no link, code, payment, or callback."
      clueTitle="Name the safety clue"
      scenario={gS5Scenario}
    />
  );
}
