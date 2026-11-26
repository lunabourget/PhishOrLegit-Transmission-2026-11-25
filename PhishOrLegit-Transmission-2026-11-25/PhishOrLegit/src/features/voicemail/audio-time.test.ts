import { describe, expect, it } from "vitest";

import { formatAudioTime } from "./audio-time";

describe("formatAudioTime", () => {
  it("formats finite audio durations", () => {
    expect(formatAudioTime(0)).toBe("0:00");
    expect(formatAudioTime(65.8)).toBe("1:05");
  });

  it("does not display a false zero duration when metadata is unavailable", () => {
    expect(formatAudioTime(null)).toBe("--:--");
    expect(formatAudioTime(Number.NaN)).toBe("--:--");
    expect(formatAudioTime(Number.POSITIVE_INFINITY)).toBe("--:--");
  });
});
