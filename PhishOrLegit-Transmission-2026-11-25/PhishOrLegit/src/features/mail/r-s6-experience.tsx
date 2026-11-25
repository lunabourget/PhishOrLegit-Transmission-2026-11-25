import { rS6Scenario } from "@/data/scenarios/r-s6";

import { EmailScanExperience } from "./email-scan-experience";

export function RS6Experience() {
  return (
    <EmailScanExperience
      actionDetail="Invoice_November.pdf.html"
      actionLabel="Invoice_November.pdf.html"
      avatarLabel="B"
      body="The attached invoice is ready: Invoice_November.pdf.html"
      correction="the file ends in .html, so it is a web page disguised as a PDF"
      correctionLabel="The attachment uses a double extension"
      correctEvidence="action"
      scenario={rS6Scenario}
      senderAddress="finance@brightwave.com"
      senderName="Brightwave Finance"
    />
  );
}
