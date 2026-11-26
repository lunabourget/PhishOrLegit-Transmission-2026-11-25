"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

import { DeviceCanvas } from "@/components/layout/device-canvas";
import { LegacyHashRouter } from "@/components/routing/legacy-hash-router";
import { CardScanner } from "@/components/scanner/card-scanner";
import { SystemIcon } from "@/components/ios/system-icon";
import { publicPath } from "@/lib/public-path";

import styles from "./page.module.css";

const howSteps = [
  {
    id: "scan",
    number: "1",
    title: "Scan the card",
    description: "Use the QR code on a physical Scan me or LINK card.",
    image: "/home/illustrations/step-scan.webp",
    width: 170,
    height: 153,
  },
  {
    id: "investigate",
    number: "2",
    title: "Investigate",
    description:
      "Inspect the message and look for suspicious details. Don't reveal the answer yet.",
    image: "/home/illustrations/step-investigate.webp",
    width: 143,
    height: 141,
  },
  {
    id: "vote",
    number: "3",
    title: "Vote on the board",
    description:
      "Make your PHISH or LEGIT decision with the physical vote cards, following your game's rules.",
    image: "/home/illustrations/step-vote.webp",
    width: 197,
    height: 118,
  },
] as const;

type HowStep = (typeof howSteps)[number];

export default function Home() {
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

  return (
    <>
      <LegacyHashRouter />
      <DeviceCanvas>
        <div className={`screen ${styles.homeScreen}`}>
          <div className={styles.homeContent}>
            <div className={styles.homeSurface}>
              <div
                aria-hidden="true"
                className={styles.homeAtmosphere}
                style={{
                  backgroundImage: `url("${publicPath("/home/backgrounds/room-ambient.webp")}")`,
                }}
              />
              <div className={styles.homeInner}>
                <header className={styles.homeHeader}>
                  <div className={styles.logoTile}>
                    <Image
                      alt="Phish or Legit? logo"
                      height={48}
                      priority
                      src={publicPath("/brand/phish-or-legit-logo.svg")}
                      width={48}
                    />
                  </div>
                  <p className={styles.brandTitle}>Phish or Legit?</p>
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

                <section
                  aria-labelledby="home-headline"
                  className={styles.hero}
                >
                  <div className={styles.headlineFrame}>
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={styles.headlinePaper}
                      height={172}
                      priority
                      src={publicPath("/home/ui/headline-paper.svg")}
                      width={660}
                    />
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={`${styles.headlineRays} ${styles.headlineRaysLeft}`}
                      height={75}
                      src={publicPath("/home/ui/accent-rays.svg")}
                      width={80}
                    />
                    <h1
                      aria-label="Ready to play detective?"
                      className={styles.heroTitle}
                      id="home-headline"
                    >
                      <span>Ready to play</span>
                      <span>detective?</span>
                    </h1>
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={styles.headlineUnderline}
                      height={42}
                      src={publicPath("/home/ui/headline-underline.svg")}
                      width={270}
                    />
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={`${styles.headlineRays} ${styles.headlineRaysRight}`}
                      height={75}
                      src={publicPath("/home/ui/accent-rays.svg")}
                      width={80}
                    />
                  </div>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.heroScene}
                    height={329}
                    priority
                    src={publicPath("/home/backgrounds/hero-scene.webp")}
                    width={928}
                  />
                </section>

                <div className={styles.scanCta} id="scan-a-card">
                  <CardScanner className={styles.scanButton} />
                </div>

                <aside
                  aria-label="A companion for the physical game"
                  className={styles.companionPanel}
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.companionMeeple}
                    height={99}
                    src={publicPath(
                      "/home/illustrations/companion-meeple.webp",
                    )}
                    width={98}
                  />
                  <p className={styles.companionText}>
                    A companion for <strong>the physical game!</strong>
                  </p>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.companionCards}
                    height={156}
                    src={publicPath(
                      "/home/illustrations/companion-card-stack.webp",
                    )}
                    width={183}
                  />
                </aside>

                <section
                  aria-labelledby="how-it-works-title"
                  className={styles.howSection}
                  id="how-it-works"
                >
                  <div className={styles.sectionHeading}>
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={styles.sectionRays}
                      height={75}
                      src={publicPath("/home/ui/accent-rays.svg")}
                      width={80}
                    />
                    <div className={styles.sectionRibbon}>
                      <Image
                        alt=""
                        aria-hidden="true"
                        className={styles.sectionRibbonImage}
                        height={88}
                        src={publicPath("/home/ui/section-ribbon.svg")}
                        width={500}
                      />
                      <h2 id="how-it-works-title">HOW IT WORKS</h2>
                    </div>
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={`${styles.sectionRays} ${styles.sectionRaysRight}`}
                      height={75}
                      src={publicPath("/home/ui/accent-rays.svg")}
                      width={80}
                    />
                  </div>
                  <div className={styles.stepsGrid}>
                    {howSteps.map((step, index) => (
                      <Fragment key={step.id}>
                        <button
                          aria-label={step.title}
                          className={styles.stepCard}
                          data-step={step.id}
                          onClick={(event) => {
                            tutorialTriggerRef.current = event.currentTarget;
                            setActiveStep(step);
                          }}
                          type="button"
                        >
                          <span
                            aria-hidden="true"
                            className={styles.stepNumber}
                          >
                            {step.number}
                          </span>
                          <Image
                            alt=""
                            aria-hidden="true"
                            className={styles.stepImage}
                            height={step.height}
                            src={publicPath(step.image)}
                            width={step.width}
                          />
                          <span className={styles.stepTitle}>{step.title}</span>
                        </button>
                        {index < howSteps.length - 1 ? (
                          <Image
                            alt=""
                            aria-hidden="true"
                            className={styles.stepArrow}
                            height={40}
                            src={publicPath("/home/ui/step-arrow.svg")}
                            width={32}
                          />
                        ) : null}
                      </Fragment>
                    ))}
                  </div>
                </section>

                <footer className={styles.safetyNotice}>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.safetyIcon}
                    height={42}
                    src={publicPath("/home/ui/safety-shield.svg")}
                    width={40}
                  />
                  <p>
                    Training simulation only. Nothing entered here is sent or
                    saved.
                  </p>
                </footer>
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
        </div>
      </DeviceCanvas>
    </>
  );
}
