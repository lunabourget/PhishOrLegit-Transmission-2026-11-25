"use client";

import {
  BrowserCodeReader,
  BrowserQRCodeReader,
  type IScannerControls,
} from "@zxing/browser";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { SystemIcon } from "@/components/ios/system-icon";
import { resolveScannedCard } from "@/domain/routing/resolve-scanned-card";

import styles from "./card-scanner.module.css";

type ScannerStatus = "starting" | "scanning" | "invalid" | "error";

function cameraErrorMessage(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Camera access is off. Allow it in your browser settings, or enter the card code below.";
    }

    if (error.name === "NotFoundError") {
      return "No camera was found. Enter the card code below.";
    }
  }

  return "The camera could not start. Enter the card code below.";
}

export function CardScanner() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const handledRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [status, setStatus] = useState<ScannerStatus>("starting");
  const [statusMessage, setStatusMessage] = useState("Starting the camera…");

  const stopScanner = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    BrowserCodeReader.releaseAllStreams();
  }, []);

  const openRoute = useCallback(
    (scannedValue: string) => {
      const route = resolveScannedCard(scannedValue);

      if (!route) {
        setStatus("invalid");
        setStatusMessage(
          "This QR code is not a Phish or Legit card. Try another one.",
        );
        return false;
      }

      if (handledRef.current) {
        return true;
      }

      handledRef.current = true;
      stopScanner();
      navigator.vibrate?.(45);
      setOpen(false);
      router.push(route);
      return true;
    },
    [router, stopScanner],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let disposed = false;

    async function startScanner() {
      if (!navigator.mediaDevices?.getUserMedia || !videoRef.current) {
        setStatus("error");
        setStatusMessage(
          "Camera scanning is not available here. Enter the card code below.",
        );
        return;
      }

      const reader = new BrowserQRCodeReader(undefined, {
        delayBetweenScanAttempts: 180,
        delayBetweenScanSuccess: 800,
      });

      try {
        const controls = await reader.decodeFromConstraints(
          {
            audio: false,
            video: {
              facingMode: { ideal: "environment" },
              height: { ideal: 1080 },
              width: { ideal: 1920 },
            },
          },
          videoRef.current,
          (result, _error, activeControls) => {
            controlsRef.current = activeControls;

            if (result && !handledRef.current) {
              openRoute(result.getText());
            }
          },
        );

        if (disposed) {
          controls.stop();
          return;
        }

        controlsRef.current = controls;
        setStatus("scanning");
        setStatusMessage("Point the camera at the QR code on the card.");
      } catch (error) {
        if (!disposed) {
          setStatus("error");
          setStatusMessage(cameraErrorMessage(error));
        }
      }
    }

    void startScanner();

    return () => {
      disposed = true;
      document.body.style.overflow = previousOverflow;
      stopScanner();
    };
  }, [open, openRoute, stopScanner]);

  function closeScanner() {
    stopScanner();
    setOpen(false);
  }

  function beginScanner() {
    handledRef.current = false;
    setManualCode("");
    setStatus("starting");
    setStatusMessage("Starting the camera…");
    setOpen(true);
  }

  function submitManualCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openRoute(manualCode);
  }

  return (
    <>
      <GlassButton
        className={styles.launchButton}
        onClick={beginScanner}
        prominence="primary"
      >
        <SystemIcon name="camera" size={21} />
        Scan a card
      </GlassButton>

      {open ? (
        <section
          aria-label="Scan a Phish or Legit card"
          aria-modal="true"
          className={styles.scannerOverlay}
          role="dialog"
        >
          <video
            aria-label="Camera preview"
            autoPlay
            className={styles.cameraPreview}
            muted
            playsInline
            ref={videoRef}
          />
          <div className={styles.cameraShade} />

          <header className={styles.scannerHeader}>
            <div>
              <span className={styles.eyebrow}>PHISH OR LEGIT?</span>
              <h2 className={styles.scannerTitle}>Scan the card</h2>
            </div>
            <button
              aria-label="Close scanner"
              className={styles.closeButton}
              onClick={closeScanner}
              type="button"
            >
              <SystemIcon name="xmark" size={22} />
            </button>
          </header>

          <div aria-hidden="true" className={styles.scanFrame}>
            <i />
            <i />
            <i />
            <i />
            <span data-scanning={status === "scanning"} />
          </div>

          <div className={styles.scannerFooter}>
            <p aria-live="polite" className={styles.statusMessage}>
              {statusMessage}
            </p>

            <form className={styles.manualForm} onSubmit={submitManualCode}>
              <label className={styles.manualLabel} htmlFor="manual-card-code">
                Card code
              </label>
              <div className={styles.manualRow}>
                <input
                  autoCapitalize="characters"
                  autoComplete="off"
                  className={styles.manualInput}
                  id="manual-card-code"
                  onChange={(event) => setManualCode(event.target.value)}
                  placeholder="G-S1 or L01"
                  spellCheck={false}
                  value={manualCode}
                />
                <button className={styles.openButton} type="submit">
                  Open card
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
