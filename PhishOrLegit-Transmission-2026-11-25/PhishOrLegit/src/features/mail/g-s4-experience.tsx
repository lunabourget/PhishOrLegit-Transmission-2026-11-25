import { gS4Scenario } from "@/data/scenarios/g-s4";

import { EmailScanExperience } from "./email-scan-experience";

export function GS4Experience() {
  return (
    <EmailScanExperience
      actionLabel="Claim your free TV"
      avatarLabel="S"
      body="Claim your free TV now, the offer ends tonight!"
      correction="prize@sh0pnow-gifts.win"
      scenario={gS4Scenario}
      senderAddress="prize@sh0pnow-gifts.win"
      senderName="ShopNow Prizes"
    />
  );
}
