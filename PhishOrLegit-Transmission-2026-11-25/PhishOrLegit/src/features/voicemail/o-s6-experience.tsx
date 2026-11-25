import { oS6Scenario } from "@/data/scenarios/o-s6";

import { VoiceScanExperience } from "./voice-scan-experience";

export function OS6Experience() {
  return (
    <VoiceScanExperience
      callerDetail="School technology services"
      clueCorrection="The caller gives a precise maintenance notice and asks for no action, password, code, or payment."
      clueTitle="Name the safety clue"
      scenario={oS6Scenario}
    />
  );
}
