import { gS2Scenario } from "@/data/scenarios/g-s2";

import { SmsScanExperience } from "./sms-scan-experience";

export function GS2Experience() {
  return (
    <SmsScanExperience
      avatarLabel="F"
      clueCorrection="Nothing is fake here. There is no link, nothing is requested, and the message tells you never to share the code."
      clueMode="legit"
      messageLead="FriendSpace: 482913 is your login code. Never share this code with anyone, even FriendSpace staff."
      scenario={gS2Scenario}
    />
  );
}
