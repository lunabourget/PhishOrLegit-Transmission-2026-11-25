import { describe, expect, it } from "vitest";

import { currentGameRules } from "./rules";

describe("current game rules", () => {
  it("applies Breach to every pawn except the triggering pawn", () => {
    expect(currentGameRules.breach).toEqual({
      scope: "all-other-pawns",
      movement: -1,
    });
  });
});
