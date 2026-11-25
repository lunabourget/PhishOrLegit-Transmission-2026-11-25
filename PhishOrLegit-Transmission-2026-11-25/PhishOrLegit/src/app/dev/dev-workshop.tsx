"use client";

import { useState } from "react";

import { GlassButton } from "@/components/ios/glass-button";
import { IconButton } from "@/components/ios/icon-button";
import { NavigationBar } from "@/components/ios/navigation-bar";
import { SegmentedControl } from "@/components/ios/segmented-control";
import { SystemIcon } from "@/components/ios/system-icon";
import { SystemList, SystemListRow } from "@/components/ios/system-list";
import { TabBar } from "@/components/ios/tab-bar";
import { ConversationPreview } from "@/features/messages/conversation-preview";

import styles from "./dev.module.css";

const appearanceSegments = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
] as const;

export function DevWorkshop() {
  const [appearance, setAppearance] = useState("light");

  return (
    <div className={`screen ${styles.workshop}`} data-theme={appearance}>
      <NavigationBar
        leading={<IconButton icon="back" label="Back" />}
        title="Foundations"
        trailing={<IconButton icon="ellipsis" label="More" />}
      />
      <div className={`scroll-content ${styles.scrollArea}`}>
        <h1 className="large-title">iOS foundations</h1>
        <p className={styles.lede}>
          Reusable controls for simulated Messages, Mail, Safari and Phone
          experiences.
        </p>

        <h2 className="section-title">Appearance</h2>
        <SegmentedControl
          ariaLabel="Appearance"
          onChange={setAppearance}
          segments={appearanceSegments}
          value={appearance}
        />

        <h2 className="section-title">Actions</h2>
        <div className={styles.buttonGroup}>
          <GlassButton prominence="primary">Continue</GlassButton>
          <GlassButton>Inspect</GlassButton>
          <GlassButton prominence="destructive">Report</GlassButton>
          <GlassButton disabled>Unavailable</GlassButton>
        </div>

        <h2 className="section-title">System rows</h2>
        <SystemList>
          <SystemListRow
            detail="Simulated conversation interface"
            icon={<SystemIcon name="message" size={19} />}
            title="Messages"
            trailing="Ready"
          />
          <SystemListRow
            detail="Sender and destination inspection"
            icon={<SystemIcon name="envelope" size={19} />}
            title="Mail"
            trailing="Ready"
          />
          <SystemListRow
            detail="Generated voice and transcript"
            icon={<SystemIcon name="phone" size={19} />}
            title="Voicemail"
            trailing="Planned"
          />
        </SystemList>

        <h2 className="section-title">Message row</h2>
        <div className={styles.messageList}>
          <ConversationPreview
            body="Your new card is on its way. Follow delivery in the NovaBank app."
            sender="NovaBank"
            time="9:41"
            unread
          />
          <ConversationPreview
            body="We missed you today. Choose a new delivery time here."
            sender="ParcelGo"
            time="Yesterday"
          />
        </div>

        <h2 className="section-title">Semantic colors</h2>
        <div className={styles.swatches} aria-label="Semantic color palette">
          <div className={styles.swatch} data-color="green">
            <span /> Green
          </div>
          <div className={styles.swatch} data-color="orange">
            <span /> Orange
          </div>
          <div className={styles.swatch} data-color="red">
            <span /> Red
          </div>
        </div>
      </div>
      <TabBar
        tabs={[
          { icon: "message", label: "Messages", selected: true },
          { icon: "envelope", label: "Mail" },
          { icon: "globe", label: "Browser" },
          { icon: "phone", label: "Phone" },
        ]}
      />
    </div>
  );
}
