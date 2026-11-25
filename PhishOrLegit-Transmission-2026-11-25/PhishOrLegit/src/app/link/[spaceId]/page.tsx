import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { findLinkCatalogEntry, linkCatalog } from "@/data/links/catalog";
import { LinkExperience } from "@/features/link/link-experience";

type LinkPageProps = {
  params: Promise<{ spaceId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return linkCatalog.map((link) => ({ spaceId: link.id }));
}

export async function generateMetadata({
  params,
}: LinkPageProps): Promise<Metadata> {
  const { spaceId } = await params;
  return { title: `LINK ${spaceId}` };
}

export default async function LinkPage({ params }: LinkPageProps) {
  const { spaceId } = await params;
  const link = findLinkCatalogEntry(spaceId);

  if (!link) {
    notFound();
  }

  return <LinkExperience link={link} />;
}
