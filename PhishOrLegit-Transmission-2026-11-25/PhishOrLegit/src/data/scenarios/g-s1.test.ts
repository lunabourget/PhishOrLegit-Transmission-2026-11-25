import { describe, expect, it } from "vitest";

import { gS1Scenario } from "./g-s1";

describe("G-S1 scenario", () => {
  it("keeps the exact v8 route, verdict, and fake sender clue", () => {
    expect(gS1Scenario.id).toBe("G-S1");
    expect(gS1Scenario.verdict).toBe("PHISH");
    expect(gS1Scenario.sender).toContain("streamflix.support@gmail.com");
    expect(gS1Scenario.hotspots[0]?.targetId).toBe("sender-address");
  });
});
