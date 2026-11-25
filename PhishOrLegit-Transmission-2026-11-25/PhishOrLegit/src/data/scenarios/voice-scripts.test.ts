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

  it("uses stable local MP3 paths", () => {
    for (const script of voiceScriptCatalog) {
      expect(script.assetPath).toBe(`/audio/${script.id.toLowerCase()}.mp3`);
    }
  });
});
