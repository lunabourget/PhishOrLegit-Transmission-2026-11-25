import { describe, expect, it } from "vitest";

import { rS1Scenario } from "./r-s1";
import { rS2Scenario } from "./r-s2";
import { rS3Scenario } from "./r-s3";
import { rS4Scenario } from "./r-s4";
import { rS5Scenario } from "./r-s5";
import { rS6Scenario } from "./r-s6";
import { rS7Scenario } from "./r-s7";

const redScenarios = [
  rS1Scenario,
  rS2Scenario,
  rS3Scenario,
  rS4Scenario,
  rS5Scenario,
  rS6Scenario,
  rS7Scenario,
];

describe("red Scan me scenarios", () => {
  it("implements every red route from cards v9", () => {
    expect(redScenarios.map((scenario) => scenario.id)).toEqual([
      "R-S1",
      "R-S2",
      "R-S3",
      "R-S4",
      "R-S5",
      "R-S6",
      "R-S7",
    ]);

    expect(redScenarios.map((scenario) => scenario.channel)).toEqual([
      "call",
      "call",
      "email",
      "sms",
      "sms",
      "email",
      "email",
    ]);
  });

  it("keeps the v9 verdict balance", () => {
    expect(redScenarios.map((scenario) => scenario.verdict)).toEqual([
      "PHISH",
      "LEGIT",
      "PHISH",
      "PHISH",
      "PHISH",
      "PHISH",
      "LEGIT",
    ]);
  });
});
