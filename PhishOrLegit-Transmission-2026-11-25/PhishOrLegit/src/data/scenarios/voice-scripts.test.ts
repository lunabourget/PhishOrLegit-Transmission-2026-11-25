import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { scenarioCatalog } from "./catalog";
import { voiceScriptCatalog } from "./voice-scripts";

describe("voice script catalog", () => {
  it("covers every call scenario exactly once", () => {
    const callScenarioIds = scenarioCatalog
      .filter((scenario) => scenario.channel === "call")
      .map((scenario) => scenario.id)
      .sort();
    const voiceScriptIds = voiceScriptCatalog.map((script) => script.id).sort();

    expect(voiceScriptIds).toEqual(callScenarioIds);
    expect(new Set(voiceScriptIds).size).toBe(voiceScriptIds.length);
  });

  it("uses stable local M4A paths", () => {
    for (const script of voiceScriptCatalog) {
      expect(script.assetPath).toBe(`/audio/${script.id.toLowerCase()}.m4a`);
    }
  });

  it("has a local audio file for every call scenario", () => {
    for (const script of voiceScriptCatalog) {
      expect(
        existsSync(resolve(process.cwd(), "public", script.assetPath.slice(1))),
      ).toBe(true);
    }
  });
});
