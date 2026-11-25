import { findLinkCatalogEntry } from "@/data/links/catalog";
import { findScenarioCatalogEntry } from "@/data/scenarios/catalog";

export function resolveCardHash(hash: string): string | null {
  const cardId = decodeURIComponent(hash.replace(/^#/, "")).toUpperCase();

  if (findScenarioCatalogEntry(cardId)) {
    return `/scan/${cardId}`;
  }

  if (findLinkCatalogEntry(cardId)) {
    return `/link/${cardId}`;
  }

  return null;
}
