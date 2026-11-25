import { describe, expect, it } from "vitest";

import { resolveCardHash } from "./resolve-card-hash";

describe("resolveCardHash", () => {
  it("maps legacy Scan me fragments to permanent routes", () => {
    expect(resolveCardHash("#g-s1")).toBe("/scan/G-S1");
    expect(resolveCardHash("r-s4")).toBe("/scan/R-S4");
  });

  it("maps legacy LINK fragments to permanent routes", () => {
    expect(resolveCardHash("#l01")).toBe("/link/L01");
  });

  it("rejects unknown fragments", () => {
    expect(resolveCardHash("#unknown")).toBeNull();
  });
});
