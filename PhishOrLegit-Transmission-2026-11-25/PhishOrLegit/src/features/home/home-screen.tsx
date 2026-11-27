"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { DeviceCanvas } from "@/components/layout/device-canvas";
import { LegacyHashRouter } from "@/components/routing/legacy-hash-router";
import { CardScanner } from "@/components/scanner/card-scanner";
import { SystemIcon } from "@/components/ios/system-icon";
import { publicPath } from "@/lib/public-path";

import styles from "./home-screen.module.css";

type HeroGameCardProps = {
  difficulty: "hard" | "medium" | "easy";
  cardId: string;
  mediaType: "EMAIL" | "LINK" | "SMS";
  movement: "hard" | "medium" | "easy";
};

const heroCards: HeroGameCardProps[] = [
  {
    difficulty: "hard",
    cardId: "R03",
    mediaType: "EMAIL",
    movement: "hard",
  },
  {
    difficulty: "medium",
    cardId: "O18",
    mediaType: "LINK",
    movement: "medium",
  },
  {
    difficulty: "easy",
    cardId: "G12",
    mediaType: "SMS",
    movement: "easy",
  },
];

const howSteps = [
  {
    id: "scan",
    number: "1",
    title: "Scan",
    description: "Scan a game card to get the scenario.",
    icon: "/board-style/icons/icon-qr.svg",
  },
  {
    id: "investigate",
    number: "2",
    title: "Investigate",
    description: "Read the message and look for suspicious clues.",
    icon: "/board-style/icons/icon-magnifier.svg",
  },
  {
    id: "vote",
    number: "3",
    title: "Vote",
    description: "Decide: phish or legit?",
    icon: null,
  },
] as const;

type HowStep = (typeof howSteps)[number];

function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? styles.cardWordmark : styles.brandWordmark}
      aria-hidden="true"
    >
      <span className={styles.phishWord}>PHISH</span>
      <span> OR </span>
      <span className={styles.legitWord}>LEGIT</span>
      <span> ?</span>
    </span>
  );
}

function HeroGameCard({
  difficulty,
  cardId,
  mediaType,
  movement,
}: HeroGameCardProps) {
  return (
    <div
      aria-hidden="true"
      className={styles.heroCard}
      data-difficulty={difficulty}
      data-media={mediaType}
      data-movement={movement}
    >
      <span className={`${styles.cardCorner} ${styles.cardCornerTopLeft}`} />
      <span className={`${styles.cardCorner} ${styles.cardCornerTopRight}`} />
      <span className={`${styles.cardCorner} ${styles.cardCornerBottomLeft}`} />
      <span
        className={`${styles.cardCorner} ${styles.cardCornerBottomRight}`}
      />
      <div className={styles.cardHeader}>
        <span>
          {difficulty.toUpperCase()} · {cardId}
        </span>
        {difficulty === "easy" ? <strong>+2</strong> : null}
      </div>
      <div className={styles.cardMedia}>
        {mediaType === "EMAIL" ? (
          <SystemIcon name="envelope" size={16} />
        ) : mediaType === "SMS" ? (
          <SystemIcon name="message" size={16} />
        ) : (
          <Image
            alt=""
            height={16}
            src={publicPath("/board-style/icons/icon-link.svg")}
            width={16}
          />
        )}
        <span>{mediaType}</span>
      </div>
      <div className={styles.cardMessage}>
        <span />
        <span />
        <span />
      </div>
      <BrandWordmark compact />
    </div>
  );
}

function HeroCardStack() {
  return (
    <div className={styles.heroCardStack} aria-hidden="true">
      {heroCards.map((card) => (
        <HeroGameCard key={card.cardId} {...card} />
      ))}
    </div>
  );
}

function TutorialStepCard({
  step,
  onOpen,
}: {
  step: HowStep;
  onOpen: (step: HowStep, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      aria-haspopup="dialog"
      aria-label={`${step.number} ${step.title}`}
      className={styles.stepCard}
      data-step={step.id}
      onClick={(event) => onOpen(step, event.currentTarget)}
      type="button"
    >
      <span className={styles.stepNumber}>{step.number}</span>
      {step.icon ? (
        <Image
          alt=""
          aria-hidden="true"
          className={styles.stepIcon}
          height={30}
          src={publicPath(step.icon)}
          width={30}
        />
      ) : (
        <span aria-hidden="true" className={styles.voteIcon}>
          <SystemIcon name="checkmark" size={20} />
        </span>
      )}
      <span className={styles.stepTitle}>{step.title}</span>
      <span className={styles.stepDescription}>{step.description}</span>
    </button>
  );
}

function StepArrow() {
  return (
    <svg
      aria-hidden="true"
      className={styles.stepArrow}
      fill="none"
      height="14"
      viewBox="0 0 16 14"
      width="16"
    >
      <path
        d="M1 7h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.footerDivider} />
      <div className={styles.footerContent}>
        <Image
          alt=""
          aria-hidden="true"
          height={28}
          src={publicPath("/board-style/icons/icon-safe-zone.svg")}
          width={28}
        />
        <span aria-hidden="true" className={styles.footerSeparator} />
        <p>
          <span>A private, game-based training companion.</span>
          <span>No personal data collected.</span>
        </p>
      </div>
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
                <Image
                  alt=""
                  className={styles.logo}
                  height={42}
                  priority
                  src={publicPath("/brand/phish-or-legit-logo.svg")}
                  width={42}
                />
                <span aria-hidden="true" className={styles.brandSeparator} />
                <BrandWordmark />
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
                <SystemIcon name="ellipsis" size={22} />
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
              <HeroCardStack />
              <div className={styles.heroTitle}>
                <span
                  aria-hidden="true"
                  className={`${styles.titleCorner} ${styles.titleCornerTopLeft}`}
                />
                <span
                  aria-hidden="true"
                  className={`${styles.titleCorner} ${styles.titleCornerTopRight}`}
                />
                <span
                  aria-hidden="true"
                  className={`${styles.titleCorner} ${styles.titleCornerBottomLeft}`}
                />
                <span
                  aria-hidden="true"
                  className={`${styles.titleCorner} ${styles.titleCornerBottomRight}`}
                />
                <h1 className={styles.title} id="home-title">
                  READY TO PLAY?
                </h1>
                <p className={styles.subtitle}>Think before you click.</p>
              </div>
            </section>

            <section className={styles.scanSection} id="scan-a-card">
              <div className={styles.scanArea}>
                <CardScanner className={styles.scanButton} />
                <p>
                  Use a <strong>Scan me</strong> or{" "}
                  <strong className={styles.linkText}>LINK</strong> card from
                  your game.
                </p>
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
                <span aria-hidden="true" className={styles.headingRule} />
              </div>
              <div className={styles.stepsGrid}>
                <TutorialStepCard step={howSteps[0]} onOpen={openTutorial} />
                <StepArrow />
                <TutorialStepCard step={howSteps[1]} onOpen={openTutorial} />
                <StepArrow />
                <TutorialStepCard step={howSteps[2]} onOpen={openTutorial} />
              </div>
            </section>

            <HomeFooter />
          </main>
        </div>
      </DeviceCanvas>

      <dialog
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description"
        className={styles.dialog}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeTutorial();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeTutorial();
        }}
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
