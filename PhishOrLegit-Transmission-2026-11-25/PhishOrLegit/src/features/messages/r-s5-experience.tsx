import { rS5Scenario } from "@/data/scenarios/r-s5";

import { SmsScanExperience } from "./sms-scan-experience";

export function RS5Experience() {
  return (
    <SmsScanExperience
      avatarLabel="C"
      clueCorrection="The message asks you to reply with a 2FA code. Never share that code with anyone."
      clueMode="request"
      evidenceText="reply with the 6-digit code we just sent you to block them"
      messageLead="CloudBox: someone tried to sign in to your account. If it wasn't you, "
      scenario={rS5Scenario}
    />
  );
}
