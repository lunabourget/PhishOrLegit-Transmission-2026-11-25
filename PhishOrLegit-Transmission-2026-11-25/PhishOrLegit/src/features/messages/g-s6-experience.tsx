import { gS6Scenario } from "@/data/scenarios/g-s6";

import { SmsScanExperience } from "./sms-scan-experience";

export function GS6Experience() {
  return (
    <SmsScanExperience
      avatarLabel="SO"
      clueCorrection="school-meals-pay.info is an unrelated payment domain, not the official yourschool.edu website."
      clueMode="link"
      linkText="school-meals-pay.info/topup"
      messageLead="Your school meal account is empty. Add 5 euros now: "
      scenario={gS6Scenario}
    />
  );
}
