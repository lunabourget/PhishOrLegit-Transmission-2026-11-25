import { expect, test } from "@playwright/test";

test("opens the scan-first landing screen", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Ready to investigate" }),
  ).toBeVisible();
  await expect(page.getByText("Training simulation only.")).toBeVisible();
});

test("opens a card from the in-app scanner fallback", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Scan a card" }).click();

  await expect(
    page.getByRole("dialog", { name: "Scan a Phish or Legit card" }),
  ).toBeVisible();
  await page.getByLabel("Card code").fill("G-S7");
  await page.getByRole("button", { name: "Open card" }).click();

  await expect(page).toHaveURL(/\/scan\/G-S7$/);
  await expect(
    page.getByRole("heading", { name: "Your science assignment was graded" }),
  ).toBeVisible();
});

test("renders and operates the component workshop", async ({ page }) => {
  await page.goto("/dev");

  await expect(
    page.getByRole("heading", { name: "iOS foundations" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Dark" }).click();
  await expect(page.locator("[data-theme='dark']")).toBeVisible();
  await expect(page).toHaveScreenshot("foundations-dark.png", {
    animations: "disabled",
  });
});

test("keeps permanent Scan me and LINK routes", async ({ page }) => {
  await page.goto("/scan/R-S3");
  await expect(
    page.getByRole("heading", { name: "Your November payslip is ready" }),
  ).toBeVisible();

  await page.goto("/link/L02");
  await expect(
    page.getByRole("heading", { name: "School Wi-Fi" }),
  ).toBeVisible();
});

test("simulates LINK clicks and reports without opening destinations", async ({
  page,
}) => {
  await page.goto("/link/L01");
  await expect(page.getByText("Official domain.")).not.toBeVisible();

  await page.getByRole("button", { name: "Click link" }).click();
  await expect(
    page.getByRole("heading", { name: "This link is legitimate." }),
  ).toBeVisible();
  await expect(
    page.getByText("Shortcut · follow the dashed arrow"),
  ).toBeVisible();
  await expect(page.getByText("Official domain.")).toBeVisible();
  await expect(page).toHaveURL(/\/link\/L01$/);

  await page.getByRole("button", { name: "Try another action" }).click();
  await page.getByRole("button", { name: "Report link" }).click();
  await expect(page.getByText("Stay on the LINK space")).toBeVisible();

  await page.goto("/link/L02");
  await page.getByRole("button", { name: "Click link" }).click();
  await expect(page.getByText("Rickroll · move back 3")).toBeVisible();
  await expect(
    page.getByText(
      "The real school domain is yourschool.edu. Urgency: 'today'.",
    ),
  ).toBeVisible();

  await page.getByRole("button", { name: "Try another action" }).click();
  await page.getByRole("button", { name: "Report link" }).click();
  await expect(page.getByText("Move forward 2")).toBeVisible();
});

test("redirects legacy printed-card fragments", async ({ page }) => {
  await page.goto("/#g-s1");
  await expect(page).toHaveURL(/\/scan\/G-S1$/);

  await page.goto("/#l01");
  await expect(page).toHaveURL(/\/link\/L01$/);
});

test("completes the G-S1 phishing and Spot it flow", async ({ page }) => {
  await page.goto("/scan/G-S1");

  await expect(
    page.getByRole("heading", { name: "Your account is suspended!!" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();

  await expect(
    page.getByRole("heading", { name: "Spot the fake detail" }),
  ).toBeVisible();
  await page.getByTestId("sender-address").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
  await expect(page.getByText("Board movement")).toBeVisible();
  await expect(page.getByText("Clue bonus", { exact: true })).toBeVisible();
});

test("shows the safe wrong-answer consequence for G-S1", async ({ page }) => {
  await page.goto("/scan/G-S1");
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();

  await expect(
    page.getByRole("heading", { name: "This one is phishing." }),
  ).toBeVisible();
  await expect(page.getByText("Play parody")).toBeVisible();
});

test("completes the G-S2 legitimate SMS flow", async ({ page }) => {
  await page.goto("/scan/G-S2");

  await expect(
    page.getByRole("heading", { name: "FriendSpace" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await expect(
    page.getByRole("heading", { name: "Spot it or clear it" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Looks legit" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
  await expect(page.getByText("Clue bonus", { exact: true })).toBeVisible();
});

test("completes the G-S3 call flow with the accessible transcript", async ({
  page,
}) => {
  await page.goto("/scan/G-S3");

  await expect(
    page.getByRole("heading", { name: "ParcelGo delivery service" }),
  ).toBeVisible();
  await expect(page.locator("audio source")).toHaveAttribute(
    "src",
    "/audio/g-s3.m4a",
  );
  await expect(
    page.getByText("Press one and give your card number"),
  ).not.toBeVisible();
  await page.getByText("Reveal transcript hint").click();
  await expect(
    page.getByText("Press one and give your card number"),
  ).toBeVisible();

  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await expect(
    page.getByRole("heading", { name: "Name the voice clue" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the G-S4 look-alike domain flow", async ({ page }) => {
  await page.goto("/scan/G-S4");

  await expect(
    page.getByRole("heading", {
      name: "You are our 1,000,000th customer!",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("sender-address").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
  await expect(page.getByText("prize@sh0pnow-gifts.win")).toBeVisible();
});

test("completes the G-S5 legitimate school call flow", async ({ page }) => {
  await page.goto("/scan/G-S5");

  await expect(
    page.getByRole("heading", { name: "School front desk" }),
  ).toBeVisible();
  await expect(page.getByText("No need to call back.")).not.toBeVisible();
  await page.getByText("Reveal transcript hint").click();
  await expect(page.getByText("No need to call back.")).toBeVisible();
  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("completes the G-S6 fake school payment link flow", async ({ page }) => {
  await page.goto("/scan/G-S6");

  await expect(
    page.getByRole("heading", { name: "School Office" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-link").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the G-S7 legitimate school-learning flow", async ({ page }) => {
  await page.goto("/scan/G-S7");

  await expect(
    page.getByRole("heading", { name: "Your science assignment was graded" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "Looks legit" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("completes the O-S1 fake CloudBox sender flow", async ({ page }) => {
  await page.goto("/scan/O-S1");

  await expect(
    page.getByRole("heading", { name: "Your storage is full" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("sender-address").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
  await expect(page.getByText("+3", { exact: true })).toBeVisible();
});

test("completes the O-S2 legitimate NovaBank flow", async ({ page }) => {
  await page.goto("/scan/O-S2");

  await expect(
    page.getByRole("heading", { name: "Your new card is on its way" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "Looks legit" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("completes the O-S3 look-alike ParcelGo link flow", async ({ page }) => {
  await page.goto("/scan/O-S3");

  await expect(page.getByRole("heading", { name: "ParcelGo" })).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-link").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the O-S4 fake school reset link flow", async ({ page }) => {
  await page.goto("/scan/O-S4");

  await expect(
    page.getByRole("heading", { name: "yourschool IT" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-link").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the O-S5 fake bank voice flow", async ({ page }) => {
  await page.goto("/scan/O-S5");

  await expect(
    page.getByRole("heading", { name: "NovaBank fraud team" }),
  ).toBeVisible();
  await expect(page.getByText("tell me the code")).toBeVisible();
  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the O-S6 legitimate IT notice flow", async ({ page }) => {
  await page.goto("/scan/O-S6");

  await expect(
    page.getByRole("heading", { name: "School IT desk" }),
  ).toBeVisible();
  await expect(page.getByText("No action is needed.")).toBeVisible();
  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("completes the O-S7 fake refund link flow", async ({ page }) => {
  await page.goto("/scan/O-S7");

  await expect(
    page.getByRole("heading", { name: "EventTickets" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-link").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("shows zero movement after a wrong orange answer", async ({ page }) => {
  await page.goto("/scan/O-S1");
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();

  await expect(page.getByText("Board movement")).toBeVisible();
  await expect(page.getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByText("Play parody")).toBeVisible();
});

test("completes the R-S1 deepfake manager call flow", async ({ page }) => {
  await page.goto("/scan/R-S1");

  await expect(
    page.getByRole("heading", { name: "Your manager" }),
  ).toBeVisible();
  await expect(page.getByText("urgent transfer of 9,800 euros")).toBeVisible();
  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
  await expect(page.getByText("+4", { exact: true })).toBeVisible();
});

test("completes the R-S2 legitimate HR call flow", async ({ page }) => {
  await page.goto("/scan/R-S2");

  await expect(
    page.getByRole("heading", { name: "Brightwave HR" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We listened and voted" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "We named the clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("completes the R-S3 hidden payroll-domain flow", async ({ page }) => {
  await page.goto("/scan/R-S3");

  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await expect(
    page.getByText("Opens: brightwave-payroll.co/login"),
  ).toBeVisible();
  await page.getByRole("button", { name: "View my payslip" }).click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the R-S4 spoofed bank thread flow", async ({ page }) => {
  await page.goto("/scan/R-S4");

  await expect(page.getByRole("heading", { name: "NovaBank" })).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-link").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the R-S5 stolen 2FA-code request flow", async ({ page }) => {
  await page.goto("/scan/R-S5");

  await expect(page.getByRole("heading", { name: "CloudBox" })).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page.getByTestId("message-request").click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the R-S6 disguised HTML attachment flow", async ({ page }) => {
  await page.goto("/scan/R-S6");

  await expect(
    page.getByRole("heading", { name: "Updated supplier invoice" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose PHISH" }).click();
  await page
    .getByRole("button", { name: "Invoice_November.pdf.html", exact: true })
    .click();
  await page.getByRole("button", { name: "Check my clue" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is phishing." }),
  ).toBeVisible();
});

test("completes the R-S7 legitimate security-notice flow", async ({ page }) => {
  await page.goto("/scan/R-S7");

  await expect(
    page.getByRole("heading", { name: "New sign-in to your account" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();
  await page.getByRole("button", { name: "Looks legit" }).click();

  await expect(
    page.getByRole("heading", { name: "Correct. This is legitimate." }),
  ).toBeVisible();
});

test("shows zero movement after a wrong red answer", async ({ page }) => {
  await page.goto("/scan/R-S3");
  await page.getByRole("button", { name: "We voted on the board" }).click();
  await page.getByRole("button", { name: "Choose LEGIT" }).click();

  await expect(page.getByText("Board movement")).toBeVisible();
  await expect(page.getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByText("Play parody")).toBeVisible();
});
