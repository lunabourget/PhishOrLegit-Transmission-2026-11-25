import { gS7Scenario } from "@/data/scenarios/g-s7";

import { EmailScanExperience } from "./email-scan-experience";

export function GS7Experience() {
  return (
    <EmailScanExperience
      actionLabel="Open the school learning app"
      avatarLabel="Y"
      body="Your science assignment has been graded. Open the school learning app to see your feedback."
      clueMode="legit"
      correction="The sender uses yourschool.edu, asks for nothing sensitive, and directs you to the school app."
      scenario={gS7Scenario}
      senderAddress="no-reply@yourschool.edu"
      senderName="YourSchool Learning"
    />
  );
}
