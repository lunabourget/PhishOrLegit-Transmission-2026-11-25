import { describe, expect, it } from "vitest";

import { oS1Scenario } from "./o-s1";
import { oS2Scenario } from "./o-s2";
import { oS3Scenario } from "./o-s3";
import { oS4Scenario } from "./o-s4";
import { oS5Scenario } from "./o-s5";
import { oS6Scenario } from "./o-s6";
import { oS7Scenario } from "./o-s7";

const orangeScenarios = [
  oS1Scenario,
  oS2Scenario,
  oS3Scenario,
  oS4Scenario,
  oS5Scenario,
  oS6Scenario,
  oS7Scenario,
];

describe("orange Scan me scenarios", () => {
  it("implements every orange route from cards v9", () => {
    expect(orangeScenarios.map((scenario) => scenario.id)).toEqual([
      "O-S1",
      "O-S2",
      "O-S3",
      "O-S4",
      "O-S5",
      "O-S6",
      "O-S7",
    ]);

    expect(orangeScenarios.map((scenario) => scenario.channel)).toEqual([
      "email",
      "email",
      "sms",
      "sms",
      "call",
      "call",
      "sms",
    ]);
  });

  it("keeps the v9 verdict balance", () => {
    expect(orangeScenarios.map((scenario) => scenario.verdict)).toEqual([
      "PHISH",
      "LEGIT",
      "PHISH",
      "PHISH",
      "PHISH",
      "LEGIT",
      "PHISH",
    ]);
  });
});
