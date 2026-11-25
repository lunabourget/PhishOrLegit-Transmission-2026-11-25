import { describe, expect, it } from "vitest";

import { gS1Scenario } from "./g-s1";
import { gS2Scenario } from "./g-s2";
import { gS3Scenario } from "./g-s3";
import { gS4Scenario } from "./g-s4";
import { gS5Scenario } from "./g-s5";
import { gS6Scenario } from "./g-s6";
import { gS7Scenario } from "./g-s7";

const greenScenarios = [
  gS1Scenario,
  gS2Scenario,
  gS3Scenario,
  gS4Scenario,
  gS5Scenario,
  gS6Scenario,
  gS7Scenario,
];

describe("green Scan me scenarios", () => {
  it("implements every green route from cards v9", () => {
    expect(greenScenarios.map((scenario) => scenario.id)).toEqual([
      "G-S1",
      "G-S2",
      "G-S3",
      "G-S4",
      "G-S5",
      "G-S6",
      "G-S7",
    ]);

    expect(greenScenarios.map((scenario) => scenario.channel)).toEqual([
      "email",
      "sms",
      "call",
      "email",
      "call",
      "sms",
      "email",
    ]);
  });

  it("keeps the v9 verdict balance", () => {
    expect(greenScenarios.map((scenario) => scenario.verdict)).toEqual([
      "PHISH",
      "LEGIT",
      "PHISH",
      "PHISH",
      "LEGIT",
      "PHISH",
      "LEGIT",
    ]);
  });
});
