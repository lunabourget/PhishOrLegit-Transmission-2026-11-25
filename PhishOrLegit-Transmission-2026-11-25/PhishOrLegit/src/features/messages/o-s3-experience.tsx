import { oS3Scenario } from "@/data/scenarios/o-s3";

import { SmsScanExperience } from "./sms-scan-experience";

export function OS3Experience() {
  return (
    <SmsScanExperience
      avatarLabel="P"
      clueCorrection="The link says parceIgo.com with a capital I instead of a lowercase l. Open the official app when in doubt."
      clueMode="link"
      linkText="parceIgo.com/r/58210"
      messageLead="ParcelGo: we missed you today! Choose a new delivery time here: "
      scenario={oS3Scenario}
    />
  );
}
