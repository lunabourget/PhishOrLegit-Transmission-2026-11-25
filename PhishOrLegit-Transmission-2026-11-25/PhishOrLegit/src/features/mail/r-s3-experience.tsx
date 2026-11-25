import { rS3Scenario } from "@/data/scenarios/r-s3";

import { EmailScanExperience } from "./email-scan-experience";

export function RS3Experience() {
  return (
    <EmailScanExperience
      actionDetail="brightwave-payroll.co/login"
      actionLabel="View my payslip"
      avatarLabel="B"
      body="View your November payslip in the secure payroll portal."
      correction="brightwave-payroll.co is not brightwave.com"
      correctionLabel="The button reveals a different domain"
      correctEvidence="action"
      scenario={rS3Scenario}
      senderAddress="hr@brightwave.com"
      senderName="Brightwave HR"
    />
  );
}
