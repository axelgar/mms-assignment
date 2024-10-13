import { test, expect } from "@playwright/test";

test("can search for issues using search bar", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const input = await page.locator("input");
  await input.fill("Bug");

  const submitButton = await page.getByRole("button", { name: "Search" });
  await submitButton.click();

  const issuesWithTitleBug = await page.getByText(/bug/i);

  expect(await issuesWithTitleBug.count()).toBeGreaterThan(1);
});

test("show issues not found message when no issues are returned", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const input = await page.locator("input");
  await input.fill("qwertyuiopasdsaf");

  const submitButton = await page.getByRole("button", { name: "Search" });
  await submitButton.click();

  const noIssuesMessage = await page.getByText(/No issues found/i);

  expect(noIssuesMessage).toBeVisible();
});
