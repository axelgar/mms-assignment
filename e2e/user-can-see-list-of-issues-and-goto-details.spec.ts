import { test, expect } from "@playwright/test";

test("should navigate to homepage and find the title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const heading = await page.locator("h1");
  await expect(heading).toHaveText("Welcome to the React repo issues tracker! 👋");
});

test("should be able to click on a specific issue and navigate to details", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const firstIssue = page.locator("ul > li").nth(0);
  await firstIssue.click();

  await expect(page).toHaveURL(/issue/);
});

test("should be able to go back to the list", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const firstIssue = page.locator("ul > li").nth(0);
  await firstIssue.click();

  await expect(page).toHaveURL(/issue/);

  const goBackButton = page.getByRole("button", { name: "Go to issues list" });
  await goBackButton.click();

  const heading = await page.locator("h1");
  await expect(heading).toHaveText("Welcome to the React repo issues tracker! 👋");
});
