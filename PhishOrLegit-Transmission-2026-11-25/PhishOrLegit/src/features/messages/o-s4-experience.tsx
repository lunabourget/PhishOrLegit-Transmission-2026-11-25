import { oS4Scenario } from "@/data/scenarios/o-s4";

import { SmsScanExperience } from "./sms-scan-experience";

export function OS4Experience() {
  return (
    <SmsScanExperience
      avatarLabel="IT"
      clueCorrection="The link uses yourschool-wifi.co, not the official yourschool.edu domain."
      clueMode="link"
      linkText="yourschool-wifi.co/reset"
      messageLead="Your school password expires today. Reset it now to keep your access: "
      scenario={oS4Scenario}
    />
  );
}
