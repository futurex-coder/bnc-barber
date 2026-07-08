import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/lokacii",
  "/lokacii/zdravets-iztok",
  "/lokacii/center",
  "/ekip",
  "/uslugi",
  "/akademiya",
  "/galeriya",
  "/za-nas",
  "/kontakti",
];

for (const path of routes) {
  test(`${path} loads without console/page errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status(), `HTTP status for ${path}`).toBeLessThan(400);

    // Every page must have exactly one <h1> and a document title.
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Bonnie & Clyde/);

    expect(errors, `console/page errors on ${path}`).toEqual([]);
  });
}

test("404 route renders the custom not-found page", async ({ page }) => {
  const res = await page.goto("/definitely-not-a-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("подстригахме")).toBeVisible();
});

test("primary nav is keyboard reachable and booking CTA points to Fresha", async ({
  page,
}) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /Запази час/ }).first();
  await expect(cta).toHaveAttribute("href", /fresha\.com/);
});

test("skip link is the first focusable element", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.textContent);
  expect(focused).toContain("съдържанието");
});
