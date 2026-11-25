import type { NextConfig } from "next";

const githubRepository = process.env.GITHUB_REPOSITORY ?? "";
const [githubOwner = "", githubRepositoryName = ""] =
  githubRepository.split("/");
const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === "true" && Boolean(githubRepositoryName);
const isGitHubUserSite =
  githubRepositoryName.toLowerCase() ===
  `${githubOwner.toLowerCase()}.github.io`;
const basePath =
  isGitHubPagesBuild && !isGitHubUserSite ? `/${githubRepositoryName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        basePath,
        images: { unoptimized: true },
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
