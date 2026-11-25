import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  findScenarioCatalogEntry,
  scenarioCatalog,
} from "@/data/scenarios/catalog";
import { GS1Experience } from "@/features/mail/g-s1-experience";
import { GS4Experience } from "@/features/mail/g-s4-experience";
import { GS7Experience } from "@/features/mail/g-s7-experience";
import { OS1Experience } from "@/features/mail/o-s1-experience";
import { OS2Experience } from "@/features/mail/o-s2-experience";
import { RS3Experience } from "@/features/mail/r-s3-experience";
import { RS6Experience } from "@/features/mail/r-s6-experience";
import { RS7Experience } from "@/features/mail/r-s7-experience";
import { GS2Experience } from "@/features/messages/g-s2-experience";
import { GS6Experience } from "@/features/messages/g-s6-experience";
import { OS3Experience } from "@/features/messages/o-s3-experience";
import { OS4Experience } from "@/features/messages/o-s4-experience";
import { OS7Experience } from "@/features/messages/o-s7-experience";
import { RS4Experience } from "@/features/messages/r-s4-experience";
import { RS5Experience } from "@/features/messages/r-s5-experience";
import { GS3Experience } from "@/features/voicemail/g-s3-experience";
import { GS5Experience } from "@/features/voicemail/g-s5-experience";
import { OS5Experience } from "@/features/voicemail/o-s5-experience";
import { OS6Experience } from "@/features/voicemail/o-s6-experience";
import { RS1Experience } from "@/features/voicemail/r-s1-experience";
import { RS2Experience } from "@/features/voicemail/r-s2-experience";

type ScanPageProps = {
  params: Promise<{ cardId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return scenarioCatalog.map((scenario) => ({ cardId: scenario.id }));
}

export async function generateMetadata({
  params,
}: ScanPageProps): Promise<Metadata> {
  const { cardId } = await params;
  return { title: `Scan ${cardId}` };
}

export default async function ScanPage({ params }: ScanPageProps) {
  const { cardId } = await params;
  const scenario = findScenarioCatalogEntry(cardId);

  if (!scenario) {
    notFound();
  }

  if (scenario.id === "G-S1") {
    return <GS1Experience />;
  }

  if (scenario.id === "G-S2") {
    return <GS2Experience />;
  }

  if (scenario.id === "G-S3") {
    return <GS3Experience />;
  }

  if (scenario.id === "G-S4") {
    return <GS4Experience />;
  }

  if (scenario.id === "G-S5") {
    return <GS5Experience />;
  }

  if (scenario.id === "G-S6") {
    return <GS6Experience />;
  }

  if (scenario.id === "G-S7") {
    return <GS7Experience />;
  }

  if (scenario.id === "O-S1") {
    return <OS1Experience />;
  }

  if (scenario.id === "O-S2") {
    return <OS2Experience />;
  }

  if (scenario.id === "O-S3") {
    return <OS3Experience />;
  }

  if (scenario.id === "O-S4") {
    return <OS4Experience />;
  }

  if (scenario.id === "O-S5") {
    return <OS5Experience />;
  }

  if (scenario.id === "O-S6") {
    return <OS6Experience />;
  }

  if (scenario.id === "O-S7") {
    return <OS7Experience />;
  }

  if (scenario.id === "R-S1") {
    return <RS1Experience />;
  }

  if (scenario.id === "R-S2") {
    return <RS2Experience />;
  }

  if (scenario.id === "R-S3") {
    return <RS3Experience />;
  }

  if (scenario.id === "R-S4") {
    return <RS4Experience />;
  }

  if (scenario.id === "R-S5") {
    return <RS5Experience />;
  }

  if (scenario.id === "R-S6") {
    return <RS6Experience />;
  }

  if (scenario.id === "R-S7") {
    return <RS7Experience />;
  }

  return notFound();
}
