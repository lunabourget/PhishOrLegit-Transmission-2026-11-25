import type { LinkId, Verdict } from "@/domain/scenarios/schema";

export type LinkCatalogEntry = {
  id: LinkId;
  verdict: Verdict;
};

export const linkCatalog = [
  { id: "L01", verdict: "LEGIT" },
  { id: "L02", verdict: "PHISH" },
  { id: "L03", verdict: "LEGIT" },
  { id: "L04", verdict: "PHISH" },
  { id: "L05", verdict: "LEGIT" },
  { id: "L06", verdict: "PHISH" },
  { id: "L07", verdict: "LEGIT" },
  { id: "L08", verdict: "PHISH" },
  { id: "L09", verdict: "LEGIT" },
  { id: "L10", verdict: "PHISH" },
] as const satisfies readonly LinkCatalogEntry[];

export function findLinkCatalogEntry(linkId: string) {
  return linkCatalog.find((link) => link.id === linkId);
}
