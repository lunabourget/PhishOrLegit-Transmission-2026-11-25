import { describe, expect, it } from "vitest";

import { cardIdSchema, linkIdSchema } from "./schema";

describe("permanent route identifiers", () => {
  it("accepts every supported Scan me format", () => {
    expect(cardIdSchema.parse("G-S1")).toBe("G-S1");
    expect(cardIdSchema.parse("O-S3")).toBe("O-S3");
    expect(cardIdSchema.parse("R-S7")).toBe("R-S7");
    expect(linkIdSchema.parse("L10")).toBe("L10");
  });

  it("rejects obsolete or malformed identifiers", () => {
    expect(cardIdSchema.safeParse("G01").success).toBe(false);
    expect(cardIdSchema.safeParse("G-S8").success).toBe(false);
    expect(linkIdSchema.safeParse("L11").success).toBe(false);
  });
});
