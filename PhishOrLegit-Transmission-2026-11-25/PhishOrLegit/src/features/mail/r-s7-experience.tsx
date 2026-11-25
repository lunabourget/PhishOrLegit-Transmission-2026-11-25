import { rS7Scenario } from "@/data/scenarios/r-s7";

import { EmailScanExperience } from "./email-scan-experience";

export function RS7Experience() {
  return (
    <EmailScanExperience
      actionLabel="Open the Brightwave intranet"
      avatarLabel="B"
      body="If this was not you, open the Brightwave Security page from the intranet. This email contains no link."
      clueMode="legit"
      correction="The message uses brightwave.com, contains no sign-in link, and tells you to open the intranet yourself."
      scenario={rS7Scenario}
      senderAddress="security@brightwave.com"
      senderName="Brightwave Security"
    />
  );
}
