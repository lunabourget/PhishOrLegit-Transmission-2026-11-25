"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { DeviceCanvas } from "@/components/layout/device-canvas";
import { LegacyHashRouter } from "@/components/routing/legacy-hash-router";
import { CardScanner } from "@/components/scanner/card-scanner";
import { SystemIcon } from "@/components/ios/system-icon";
import { publicPath } from "@/lib/public-path";

import styles from "./home-screen.module.css";

const howSteps = [
  {
    id: "scan",
    number: "1",
    title: "Scan the card",
    description: "Use the QR code on a physical Scan me or LINK card.",
    icon: "/board-style/icons/icon-qr.svg",
  },
  {
    id: "investigate",
    number: "2",
    title: "Investigate",
    description:
      "Inspect the message and look for suspicious details. Don't reveal the answer yet.",
    icon: "/board-style/icons/icon-magnifier.svg",
  },
  {
    id: "vote",
    number: "3",
    title: "Vote on the board",
    description:
      "Make your PHISH or LEGIT decision with the physical vote cards, following your game's rules.",
    icon: "/board-style/icons/icon-check-cross.svg",
  },
] as const;

type HowStep = (typeof howSteps)[number];

function TrainingNotice() {
  return (
    <footer className={styles.trainingNotice}>
      <Image
        alt=""
        aria-hidden="true"
        height={24}
        src={publicPath("/board-style/icons/icon-safe-zone.svg")}
        width={24}
      />
      <p>
        <strong>Training simulation only.</strong>
        <span>Nothing entered here is sent or saved.</span>
      </p>
    </footer>
  );
}

export function BoardHomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<HowStep | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tutorialTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleMenuKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeStep && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
  }, [activeStep]);

  function openTutorial(step: HowStep, trigger: HTMLButtonElement) {
    tutorialTriggerRef.current = trigger;
    setActiveStep(step);
  }

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }

  function closeTutorial() {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    } else {
      setActiveStep(null);
    }
  }

  return (
    <>
      <LegacyHashRouter />
      <DeviceCanvas>
        <div className={`screen ${styles.screen}`}>
          <main className={styles.content} data-testid="home-content">
            <header className={styles.header}>
              <a
                aria-label="Phish or Legit? home"
                className={styles.brand}
                href={publicPath("/")}
              >
                <span className={styles.logoTile}>
                  <Image
                    alt=""
                    height={36}
                    priority
                    src={publicPath("/brand/phish-or-legit-logo.svg")}
                    width={36}
                  />
                </span>
                <span>Phish or Legit?</span>
              </a>
              <button
                aria-controls="home-shortcuts"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={styles.menuButton}
                onClick={() => setMenuOpen((open) => !open)}
                ref={menuButtonRef}
                type="button"
              >
                <SystemIcon name="ellipsis" size={24} />
              </button>
              <nav
                aria-label="Home shortcuts"
                className={styles.menu}
                hidden={!menuOpen}
                id="home-shortcuts"
              >
                <a href="#scan-a-card" onClick={closeMenu}>
                  Scan a card
                </a>
                <a href="#how-to-play" onClick={closeMenu}>
                  How to play
                </a>
                {process.env.NODE_ENV === "development" ? (
                  <a href={publicPath("/dev/")} onClick={closeMenu}>
                    Component workshop
                  </a>
                ) : null}
              </nav>
            </header>

            <section aria-labelledby="home-title" className={styles.hero}>
              <div aria-hidden="true" className={styles.heroArt}>
                <div className={styles.artCardBack}>
                  <span className={styles.artCornerTop} />
                  <span className={styles.artCornerBottom} />
                  <span className={styles.artBackLabel}>CASE FILE</span>
                </div>
                <div className={styles.artCard}>
                  <span className={styles.artCardLabel}>SCAN ME</span>
                  <Image
                    alt=""
                    height={68}
                    src={publicPath("/board-style/icons/icon-qr.svg")}
                    width={68}
                  />
                  <span className={styles.artCardRule} />
                  <span className={styles.artCardRuleShort} />
                  <span className={styles.artCardDifficulty}>EASY · +2</span>
                </div>
              </div>
              <p className={styles.eyebrow}>THE PHYSICAL GAME COMPANION</p>
              <h1 className={styles.title} id="home-title">
                THINK BEFORE
                <br />
                YOU CLICK.
              </h1>
              <p className={styles.description}>
                Scan a game card, investigate the clues, and decide together.
              </p>
              <div className={styles.scanArea} id="scan-a-card">
                <CardScanner className={styles.scanButton} />
                <p>A digital companion for the physical game.</p>
              </div>
            </section>

            <section
              aria-labelledby="how-to-play-title"
              className={styles.howSection}
              id="how-to-play"
            >
              <div className={styles.sectionHeading}>
                <span className={styles.sectionMarker} aria-hidden="true" />
                <h2 id="how-to-play-title">HOW TO PLAY</h2>
              </div>
              <div className={styles.stepsGrid}>
                {howSteps.map((step) => (
                  <button
                    aria-label={step.title}
                    aria-haspopup="dialog"
                    className={styles.stepCard}
                    data-step={step.id}
                    key={step.id}
                    onClick={(event) => openTutorial(step, event.currentTarget)}
                    type="button"
                  >
                    <span className={styles.stepNumber}>{step.number}</span>
                    <Image
                      alt=""
                      aria-hidden="true"
                      height={32}
                      src={publicPath(step.icon)}
                      width={32}
                    />
                    <span className={styles.stepTitle}>{step.title}</span>
                  </button>
                ))}
              </div>
            </section>

            <TrainingNotice />
          </main>
        </div>
      </DeviceCanvas>

      <dialog
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description"
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeTutorial();
        }}
        onClose={() => {
          setActiveStep(null);
          window.requestAnimationFrame(() =>
            tutorialTriggerRef.current?.focus(),
          );
        }}
        ref={dialogRef}
      >
        {activeStep ? (
          <>
            <p className={styles.dialogStep}>STEP {activeStep.number}</p>
            <h2 className={styles.dialogTitle} id="tutorial-title">
              {activeStep.title}
            </h2>
            <p className={styles.dialogDescription} id="tutorial-description">
              {activeStep.description}
            </p>
            <button
              className={styles.dialogClose}
              onClick={closeTutorial}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
