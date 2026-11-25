import { oS2Scenario } from "@/data/scenarios/o-s2";

import { EmailScanExperience } from "./email-scan-experience";

export function OS2Experience() {
  return (
    <EmailScanExperience
      actionLabel="Open novabank.com/app"
      avatarLabel="N"
      body="You can follow the delivery in your NovaBank app."
      clueMode="legit"
      correction="The sender and link both use novabank.com, and the email asks for nothing sensitive."
      scenario={oS2Scenario}
      senderAddress="no-reply@novabank.com"
      senderName="NovaBank"
    />
  );
}
