import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS3Scenario = scenarioSchema.parse({
  id: "R-S3",
  contentVersion: "cards-v8",
  difficulty: "red",
  family: "inspect",
  channel: "email",
  verdict: "PHISH",
  sender: "Brightwave HR <hr@brightwave.com>",
  subject: "Your November payslip is ready",
  content: "View your November payslip in the secure payroll portal.",
  hotspots: [
    {
      id: "r-s3-button-domain",
      targetId: "action",
      category: "link",
      explanation:
        "The button opens brightwave-payroll.co instead of brightwave.com.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "button goes to another domain",
    "brightwave-payroll.co is not brightwave.com",
  ],
  explanation:
    "The sender can be faked. The link decides, and this one is not brightwave.com.",
});
