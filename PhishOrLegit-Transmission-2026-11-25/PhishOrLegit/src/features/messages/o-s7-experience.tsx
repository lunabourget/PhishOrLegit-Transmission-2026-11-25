import { oS7Scenario } from "@/data/scenarios/o-s7";

import { SmsScanExperience } from "./sms-scan-experience";

export function OS7Experience() {
  return (
    <SmsScanExperience
      avatarLabel="ET"
      clueCorrection="eventtickets-refund.help is not the official EventTickets domain, and refunds should not require your card details again."
      clueMode="link"
      linkText="eventtickets-refund.help/claim"
      messageLead="Your concert refund is ready. Confirm your card here: "
      scenario={oS7Scenario}
    />
  );
}
