"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { resolveCardHash } from "@/domain/routing/resolve-card-hash";

export function LegacyHashRouter() {
  const router = useRouter();

  useEffect(() => {
    const destination = resolveCardHash(window.location.hash);

    if (destination) {
      router.replace(destination);
    }
  }, [router]);

  return null;
}
