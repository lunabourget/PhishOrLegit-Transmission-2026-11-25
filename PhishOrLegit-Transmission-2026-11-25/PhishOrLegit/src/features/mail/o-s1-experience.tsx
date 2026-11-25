import { oS1Scenario } from "@/data/scenarios/o-s1";

import { EmailScanExperience } from "./email-scan-experience";

export function OS1Experience() {
  return (
    <EmailScanExperience
      actionLabel="Upgrade now"
      avatarLabel="C"
      body="Upgrade in the next 24 hours or your files will be deleted."
      correction="support@cloudb0x-mail.com uses a zero instead of an o"
      scenario={oS1Scenario}
      senderAddress="support@cloudb0x-mail.com"
      senderName="CloudBox Support"
    />
  );
}
