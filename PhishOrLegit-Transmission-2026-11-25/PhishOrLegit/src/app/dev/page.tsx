import type { Metadata } from "next";

import { DeviceCanvas } from "@/components/layout/device-canvas";

import { DevWorkshop } from "./dev-workshop";

export const metadata: Metadata = {
  title: "Component workshop",
  robots: { index: false, follow: false },
};

export default function DevPage() {
  return (
    <DeviceCanvas>
      <DevWorkshop />
    </DeviceCanvas>
  );
}
