export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const publicHomeUrl =
  "https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/";

export function publicPath(path: `/${string}`) {
  return `${publicBasePath}${path}`;
}
