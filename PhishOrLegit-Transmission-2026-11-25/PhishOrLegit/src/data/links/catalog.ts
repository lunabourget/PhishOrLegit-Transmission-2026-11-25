import type { LinkId, Verdict } from "@/domain/scenarios/schema";

export type LinkCatalogEntry = {
  explanation: string;
  id: LinkId;
  message: string;
  sender: string;
  url: string;
  verdict: Verdict;
};

export const linkCatalog = [
  {
    id: "L01",
    verdict: "LEGIT",
    sender: "NovaBank",
    message: "a new version of the app is available on",
    url: "novabank.com/app",
    explanation: "Official domain.",
  },
  {
    id: "L02",
    verdict: "PHISH",
    sender: "School Wi-Fi",
    message: "your password expires today. Reset it here:",
    url: "yourschool-wifi.co/reset",
    explanation: "The real school domain is yourschool.edu. Urgency: 'today'.",
  },
  {
    id: "L03",
    verdict: "LEGIT",
    sender: "ParcelGo",
    message: "track your parcel on",
    url: "parcelgo.com/track/PG58210",
    explanation: "Official domain.",
  },
  {
    id: "L04",
    verdict: "PHISH",
    sender: "StreamFlix",
    message: "payment failed. Update your card at",
    url: "streamflix-billing.net",
    explanation: "Look-alike domain asking for your card.",
  },
  {
    id: "L05",
    verdict: "LEGIT",
    sender: "FriendSpace",
    message: "see your new notifications on",
    url: "friendspace.com/notifications",
    explanation: "Official domain, nothing asked.",
  },
  {
    id: "L06",
    verdict: "PHISH",
    sender: "CloudBox",
    message: "3 files will be deleted. Save them now:",
    url: "cloudbox.files-restore.com",
    explanation: "The real domain is files-restore.com, not cloudbox.com.",
  },
  {
    id: "L07",
    verdict: "LEGIT",
    sender: "Your school",
    message: "the new timetable is online at",
    url: "yourschool.edu/timetable",
    explanation: "Official school domain.",
  },
  {
    id: "L08",
    verdict: "PHISH",
    sender: "ShopNow",
    message: "you won a 100 euro voucher! Claim it:",
    url: "shopnow-gift.win",
    explanation: "Fake prize and an unofficial domain.",
  },
  {
    id: "L09",
    verdict: "LEGIT",
    sender: "Brightwave",
    message: "review the security training at",
    url: "brightwave.com/security-training",
    explanation:
      "Official Brightwave domain and no sensitive information requested.",
  },
  {
    id: "L10",
    verdict: "PHISH",
    sender: "ParcelGo",
    message: "delivery failed. Choose a new time:",
    url: "parcelgo-track.delivery-help.click",
    explanation: "The real domain is delivery-help.click, not parcelgo.com.",
  },
] as const satisfies readonly LinkCatalogEntry[];

export function findLinkCatalogEntry(linkId: string) {
  return linkCatalog.find((link) => link.id === linkId);
}
