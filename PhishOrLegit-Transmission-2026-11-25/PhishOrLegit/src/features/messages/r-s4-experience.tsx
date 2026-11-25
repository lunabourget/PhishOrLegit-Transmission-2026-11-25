import { rS4Scenario } from "@/data/scenarios/r-s4";

import { SmsScanExperience } from "./sms-scan-experience";

export function RS4Experience() {
  return (
    <SmsScanExperience
      avatarLabel="N"
      clueCorrection="The real domain is com-secure.help, not novabank.com. A sender name can be spoofed into a familiar thread."
      clueMode="link"
      linkText="novabank.com-secure.help/device"
      messageLead="NovaBank: a new device was added to your account. Not you? Secure your account now: "
      scenario={rS4Scenario}
    />
  );
}
