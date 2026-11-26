"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { DeviceCanvas } from "@/components/layout/device-canvas";
import { LegacyHashRouter } from "@/components/routing/legacy-hash-router";
import { CardScanner } from "@/components/scanner/card-scanner";
import { SystemIcon } from "@/components/ios/system-icon";
import { publicPath } from "@/lib/public-path";

import styles from "./board-home-screen.module.css";

const howSteps = [
  {
    id: "scan",
    number: "1",
    title: "Scan the card",
    description: "Use the QR code on a physical Scan me or LINK card.",
    image: "/board-style/cards/tile-step-scan.svg",
    icon: "/board-style/icons/icon-qr.svg",
  },
  {
    id: "investigate",
    number: "2",
    title: "Investigate",
    description:
      "Inspect the message and look for suspicious details. Don't reveal the answer yet.",
    image: "/board-style/cards/tile-step-investigate.svg",
    icon: "/board-style/icons/icon-magnifier.svg",
  },
  {
    id: "vote",
    number: "3",
    title: "Vote on the board",
    description:
      "Make your PHISH or LEGIT decision with the physical vote cards, following your game's rules.",
    image: "/board-style/cards/tile-step-vote.svg",
    icon: "/board-style/icons/icon-check-cross.svg",
  },
] as const;

type HowStep = (typeof howSteps)[number];

function BoardHero() {
  return (
    <section aria-labelledby="home-headline" className={styles.hero}>
      <div aria-hidden="true" className={styles.boardTrack}>
        <span className={styles.trackStart}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.trackIcon}
            height={16}
            src={publicPath("/board-style/icons/icon-inbox.svg")}
            width={16}
          />
          INBOX
        </span>
        <span className={styles.trackCell}>01</span>
        <span className={styles.trackCell}>02</span>
        <span className={styles.trackLink}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.trackIcon}
            height={16}
            src={publicPath("/board-style/icons/icon-link.svg")}
            width={16}
          />
          LINK
        </span>
        <span className={styles.trackTwoFactor}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.trackIcon}
            height={16}
            src={publicPath("/board-style/icons/icon-2fa.svg")}
            width={16}
          />
          2FA
        </span>
      </div>
      <div className={styles.heroFrame}>
        <p className={styles.heroEyebrow}>YOUR NEXT MOVE</p>
        <h1 className={styles.heroTitle} id="home-headline">
          <span>PHISH</span>
          <span className={styles.titleJoin}>OR</span>
          <span className={styles.titleLegit}>LEGIT?</span>
        </h1>
        <p className={styles.heroSubtitle}>Think before you click.</p>
      </div>
      <ul aria-label="Game card difficulty colors" className={styles.legend}>
        <li>
          <i data-color="green" /> Easy
        </li>
        <li>
          <i data-color="orange" /> Medium
        </li>
        <li>
          <i data-color="red" /> Hard
        </li>
        <li>
          <i data-color="teal" /> LINK
        </li>
      </ul>
    </section>
  );
}

function ScanActionButton() {
  return (
    <div
      className={styles.scanAction}
      id="scan-a-card"
      style={{
        backgroundImage: `url("${publicPath("/board-style/ui/button-scan-bg.svg")}")`,
      }}
    >
      <CardScanner className={styles.scanButton} />
    </div>
  );
}

function HowItWorksCard({
  onSelect,
  step,
}: {
  onSelect: (step: HowStep, trigger: HTMLButtonElement) => void;
  step: HowStep;
}) {
  return (
    <button
      className={styles.stepCard}
      data-step={step.id}
      onClick={(event) => onSelect(step, event.currentTarget)}
      type="button"
    >
      <Image
        alt=""
        aria-hidden="true"
        className={styles.stepCardArt}
        fill
        loading="eager"
        sizes="(max-width: 24rem) 90vw, 33vw"
        src={publicPath(step.image)}
      />
      <span aria-hidden="true" className={styles.stepNumber}>
        <Image
          alt=""
          aria-hidden="true"
          height={48}
          src={publicPath(`/board-style/ui/badge-step-${step.number}.svg`)}
          width={48}
        />
        <span>{step.number}</span>
      </span>
      <Image
        alt=""
        aria-hidden="true"
        className={styles.stepIcon}
        height={42}
        src={publicPath(step.icon)}
        width={42}
      />
      <span className={styles.stepTitle}>{step.title}</span>
    </button>
  );
}

function TrainingNotice() {
  return (
    <footer className={styles.trainingNotice}>
      <Image
        alt=""
        aria-hidden="true"
        height={30}
        src={publicPath("/board-style/icons/icon-safe-zone.svg")}
        width={30}
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
  const tutorialDialogRef = useRef<HTMLDialogElement>(null);
  const tutorialCloseRef = useRef<HTMLButtonElement>(null);
  const tutorialTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

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
    const dialog = tutorialDialogRef.current;

    if (activeStep && dialog && !dialog.open) {
      dialog.showModal();
      tutorialCloseRef.current?.focus();
    }
  }, [activeStep]);

  function closeTutorial() {
    const dialog = tutorialDialogRef.current;

    if (dialog?.open) {
      dialog.close();
    } else {
      setActiveStep(null);
    }
  }

  function openTutorial(step: HowStep, trigger: HTMLButtonElement) {
    tutorialTriggerRef.current = trigger;
    setActiveStep(step);
  }

  return (
    <>
      <LegacyHashRouter />
      <DeviceCanvas>
        <div className={`screen ${styles.homeScreen}`}>
          <div className={styles.homeContent}>
            <div className={styles.homeSurface}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.homeBackground}
                fill
                priority
                sizes="100vw"
                src={publicPath("/board-style/backgrounds/home-bg-grid.svg")}
              />
              <div className={styles.homeInner}>
                <header className={styles.homeHeader}>
                  <div className={styles.brandLockup}>
                    <span className={styles.logoTile}>
                      <Image
                        alt="Phish or Legit? original logo"
                        height={48}
                        priority
                        src={publicPath("/brand/phish-or-legit-logo.svg")}
                        width={48}
                      />
                    </span>
                    <span className={styles.brandCopy}>
                      <span className={styles.brandEyebrow}>THE GAME</span>
                      <span className={styles.brandTitle}>Phish or Legit?</span>
                    </span>
                  </div>
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
                    className={styles.homeMenu}
                    hidden={!menuOpen}
                    id="home-shortcuts"
                  >
                    <a
                      className={styles.menuLink}
                      href="#scan-a-card"
                      onClick={() => setMenuOpen(false)}
                    >
                      Scan a card
                    </a>
                    <a
                      className={styles.menuLink}
                      href="#how-it-works"
                      onClick={() => setMenuOpen(false)}
                    >
                      How it works
                    </a>
                    {process.env.NODE_ENV === "development" ? (
                      <a
                        className={styles.menuLink}
                        href={publicPath("/dev/")}
                        onClick={() => setMenuOpen(false)}
                      >
                        Component workshop
                      </a>
                    ) : null}
                  </nav>
                </header>

                <BoardHero />

                <div className={styles.scanArea}>
                  <ScanActionButton />
                  <p
                    className={styles.companionLine}
                    style={{
                      backgroundImage: `url("${publicPath("/board-style/ui/pill-physical-game-bg.svg")}")`,
                    }}
                  >
                    A digital companion for the physical game.
                  </p>
                </div>

                <section
                  aria-labelledby="how-it-works-title"
                  className={styles.howSection}
                  id="how-it-works"
                >
                  <div className={styles.sectionHeading}>
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={styles.sectionRibbon}
                      height={50}
                      src={publicPath(
                        "/board-style/ui/ribbon-how-it-works.svg",
                      )}
                      width={260}
                    />
                    <h2 id="how-it-works-title">HOW IT WORKS</h2>
                  </div>
                  <div className={styles.stepsGrid}>
                    {howSteps.map((step) => (
                      <HowItWorksCard
                        key={step.id}
                        onSelect={openTutorial}
                        step={step}
                      />
                    ))}
                  </div>
                </section>

                <TrainingNotice />
              </div>
            </div>

            <dialog
              aria-labelledby="tutorial-title"
              className={styles.tutorialDialog}
              onClose={() => {
                setActiveStep(null);
                window.requestAnimationFrame(() =>
                  tutorialTriggerRef.current?.focus(),
                );
              }}
              ref={tutorialDialogRef}
            >
              {activeStep ? (
                <>
                  <p className={styles.dialogEyebrow}>
                    STEP {activeStep.number}
                  </p>
                  <h2 className={styles.dialogTitle} id="tutorial-title">
                    {activeStep.title}
                  </h2>
                  <p className={styles.dialogDescription}>
                    {activeStep.description}
                  </p>
                  <button
                    className={styles.dialogClose}
                    onClick={closeTutorial}
                    ref={tutorialCloseRef}
                    type="button"
                  >
                    Close
                  </button>
                </>
              ) : null}
            </dialog>
          </div>
        </div>
      </DeviceCanvas>
    </>
  );
}
