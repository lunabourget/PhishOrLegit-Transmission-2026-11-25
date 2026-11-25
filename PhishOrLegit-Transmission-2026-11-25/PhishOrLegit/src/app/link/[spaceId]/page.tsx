import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NavigationBar } from "@/components/ios/navigation-bar";
import { SystemIcon } from "@/components/ios/system-icon";
import { SystemList, SystemListRow } from "@/components/ios/system-list";
import { DeviceCanvas } from "@/components/layout/device-canvas";
import { findLinkCatalogEntry, linkCatalog } from "@/data/links/catalog";

import styles from "../../route-shell.module.css";

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

  return (
    <DeviceCanvas>
      <div className="screen">
        <NavigationBar title={link.id} />
        <div className={`scroll-content ${styles.content}`}>
          <div className={styles.routeIcon} data-difficulty="link">
            <SystemIcon name="globe" size={34} />
          </div>
          <h1 className={styles.title}>LINK route reserved</h1>
          <p className={styles.body}>
            This permanent URL is ready for the controlled click-or-report
            experience. No external destination will be opened.
          </p>
          <h2 className="section-title">Current consequence model</h2>
          <SystemList>
            <SystemListRow title="Phishing + click" trailing="Back 3" />
            <SystemListRow title="Phishing + report" trailing="Forward 2" />
            <SystemListRow title="Legit + report" trailing="Stay" />
          </SystemList>
        </div>
      </div>
    </DeviceCanvas>
  );
}
