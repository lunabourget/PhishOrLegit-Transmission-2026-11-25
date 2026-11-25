import { findLinkCatalogEntry } from "@/data/links/catalog";
import { findScenarioCatalogEntry } from "@/data/scenarios/catalog";

function decodeSafely(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveIdentifier(identifier: string): string | null {
  const normalized = decodeSafely(identifier)
    .trim()
    .replace(/^#/, "")
    .toUpperCase();

  if (findScenarioCatalogEntry(normalized)) {
    return `/scan/${normalized}`;
  }

  if (findLinkCatalogEntry(normalized)) {
    return `/link/${normalized}`;
  }

  return null;
}

export function resolveScannedCard(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const directRoute = resolveIdentifier(trimmedValue);

  if (directRoute) {
    return directRoute;
  }

  try {
    const scannedUrl = new URL(trimmedValue, "https://phish-or-legit.invalid");
    const pathMatch = scannedUrl.pathname.match(
      /(?:^|\/)(scan|link)\/([^/]+)\/?$/i,
    );

    if (pathMatch) {
      const routeKind = pathMatch[1]?.toLowerCase();
      const route = resolveIdentifier(pathMatch[2] ?? "");

      if (
        route &&
        ((routeKind === "scan" && route.startsWith("/scan/")) ||
          (routeKind === "link" && route.startsWith("/link/")))
      ) {
        return route;
      }
    }

    if (scannedUrl.hash) {
      return resolveIdentifier(scannedUrl.hash);
    }
  } catch {
    return null;
  }

  return null;
}
