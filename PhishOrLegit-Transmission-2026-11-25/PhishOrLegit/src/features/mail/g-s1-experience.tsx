import { gS1Scenario } from "@/data/scenarios/g-s1";

import { EmailScanExperience } from "./email-scan-experience";

export function GS1Experience() {
  return (
    <EmailScanExperience
      actionLabel="Update your card today"
      avatarLabel="S"
      body="We could not take you payment."
      correction="streamflix.support@gmail.com"
      scenario={gS1Scenario}
      senderAddress="streamflix.support@gmail.com"
      senderName="StreamFlix Team"
    />
  );
}
