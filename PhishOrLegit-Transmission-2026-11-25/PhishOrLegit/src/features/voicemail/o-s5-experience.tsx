import { oS5Scenario } from "@/data/scenarios/o-s5";

import { VoiceScanExperience } from "./voice-scan-experience";

export function OS5Experience() {
  return (
    <VoiceScanExperience
      callerDetail="AI voice · Fake bank adviser"
      clueCorrection="The caller asks for the code received by SMS. A bank will never ask for that code."
      clueTitle="Name the voice clue"
      scenario={oS5Scenario}
    />
  );
}
