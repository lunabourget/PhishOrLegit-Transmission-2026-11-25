import { scenarioSchema } from "@/domain/scenarios/schema";

export const rS6Scenario = scenarioSchema.parse({
  id: "R-S6",
  contentVersion: "cards-v9",
  difficulty: "red",
  family: "inspect",
  channel: "email",
  verdict: "PHISH",
  sender: "Brightwave Finance <finance@brightwave.com>",
  subject: "Updated supplier invoice",
  content: "The attached invoice is ready: Invoice_November.pdf.html",
  hotspots: [
    {
      id: "r-s6-html-attachment",
      targetId: "action",
      category: "attachment",
      explanation:
        "The attachment ends in .pdf.html. It is a web page disguised as a PDF document.",
      minimumCoverage: 0.55,
    },
  ],
  acceptedClues: [
    "double file extension",
    "attachment ends in html",
    "unexpected invoice",
  ],
  explanation:
    "The file is an HTML page, not a PDF. A familiar sender name can still be spoofed.",
});
