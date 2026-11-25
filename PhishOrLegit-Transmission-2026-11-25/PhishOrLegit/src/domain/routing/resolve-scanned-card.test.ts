import { describe, expect, it } from "vitest";

import { resolveScannedCard } from "./resolve-scanned-card";

describe("resolveScannedCard", () => {
  it("opens raw Scan me and LINK identifiers", () => {
    expect(resolveScannedCard("g-s7")).toBe("/scan/G-S7");
    expect(resolveScannedCard("L10")).toBe("/link/L10");
  });

  it("opens permanent card URLs without trusting their host", () => {
    expect(resolveScannedCard("https://game.example/scan/O-S6")).toBe(
      "/scan/O-S6",
    );
    expect(resolveScannedCard("https://game.example/link/L09/")).toBe(
      "/link/L09",
    );
    expect(
      resolveScannedCard("https://student.github.io/PhishOrLegit/scan/G-S6/"),
    ).toBe("/scan/G-S6");
  });

  it("keeps compatibility with legacy hash QR codes", () => {
    expect(resolveScannedCard("https://game.example/#r-s6")).toBe("/scan/R-S6");
  });

  it("rejects unknown or non-card destinations", () => {
    expect(resolveScannedCard("https://example.com/login")).toBeNull();
    expect(resolveScannedCard("G-S8")).toBeNull();
    expect(resolveScannedCard("javascript:alert(1)")).toBeNull();
  });
});
