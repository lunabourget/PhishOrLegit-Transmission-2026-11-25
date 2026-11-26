"use client";

import { useRef, useState } from "react";

import { SystemIcon } from "@/components/ios/system-icon";

import { formatAudioTime } from "./audio-time";
import styles from "./game-audio-player.module.css";

const waveformHeights = [24, 42, 30, 58, 38, 72, 46, 28, 62, 36, 52, 26, 44];

type GameAudioPlayerProps = {
  label: string;
  src: string;
};

function validDuration(value: number) {
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function GameAudioPlayer({ label, src }: GameAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [error, setError] = useState("");

  function updateDuration(audio: HTMLAudioElement) {
    const nextDuration = validDuration(audio.duration);
    setDuration(nextDuration);
    setIsLoading(false);
  }

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio || error) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      setError("");
      setHasEnded(false);
    } catch {
      setIsPlaying(false);
      setError("Audio could not start. You can read the transcript below.");
    }
  }

  function seekTo(value: string) {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (!audio || !Number.isFinite(nextTime) || duration === null) {
      return;
    }

    audio.currentTime = Math.min(Math.max(nextTime, 0), duration);
    setCurrentTime(audio.currentTime);
  }

  function retryPlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setError("");
    setIsLoading(true);
    setCurrentTime(0);
    setIsPlaying(false);
    audio.load();
  }

  const progress =
    duration === null ? 0 : Math.min(Math.max(currentTime / duration, 0), 1);

  return (
    <div
      aria-label={label}
      className={styles.player}
      role="group"
      data-testid="game-audio-player"
    >
      <audio
        aria-hidden="true"
        className={styles.audio}
        onCanPlay={() => setIsLoading(false)}
        onDurationChange={(event) => updateDuration(event.currentTarget)}
        onEnded={() => {
          setCurrentTime(duration ?? 0);
          setIsPlaying(false);
          setHasEnded(true);
        }}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          setDuration(null);
          setError("Audio is unavailable. You can read the transcript below.");
        }}
        onLoadedMetadata={(event) => updateDuration(event.currentTarget)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => {
          setIsPlaying(true);
          setHasEnded(false);
        }}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onWaiting={() => setIsLoading(true)}
        preload="metadata"
        ref={audioRef}
        tabIndex={-1}
      >
        <source src={src} type="audio/mp4" />
      </audio>

      <div className={styles.controls}>
        <button
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className={styles.playButton}
          disabled={Boolean(error)}
          onClick={() => void togglePlayback()}
          type="button"
        >
          <SystemIcon name={isPlaying ? "pause" : "play"} size={20} />
        </button>
        <div
          aria-hidden="true"
          className={styles.waveform}
          data-playing={isPlaying}
        >
          {waveformHeights.map((height, index) => (
            <span
              data-played={progress >= index / waveformHeights.length}
              key={index}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <input
        aria-label="Audio position"
        aria-valuetext={`${formatAudioTime(currentTime)} of ${formatAudioTime(duration)}`}
        className={styles.progress}
        disabled={duration === null || Boolean(error)}
        max={duration ?? 1}
        min={0}
        onChange={(event) => seekTo(event.currentTarget.value)}
        step={0.1}
        type="range"
        value={duration === null ? 0 : Math.min(currentTime, duration)}
      />

      <div className={styles.timeRow}>
        <span>
          {error
            ? "Audio unavailable"
            : `${formatAudioTime(currentTime)} / ${formatAudioTime(duration)}`}
        </span>
        <span aria-live="polite" className={styles.status}>
          {error
            ? "Transcript available below"
            : isLoading
              ? "Loading audio…"
              : hasEnded
                ? "Playback complete"
                : isPlaying
                  ? "Playing"
                  : ""}
        </span>
      </div>

      {error ? (
        <div className={styles.error} role="alert">
          <p>{error}</p>
          <button onClick={retryPlayback} type="button">
            Retry audio
          </button>
        </div>
      ) : null}
    </div>
  );
}
