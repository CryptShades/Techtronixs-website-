import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5173";

/* ── Homepage load ────────────────────────────────────── */
test.describe("Homepage", () => {
  test("loads and displays the hero heading", async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/Techtronix Solutions/);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Transforming Businesses");
  });

  test("renders tech partner logos", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText("Cisco")).toBeVisible();
    await expect(page.getByText("Microsoft")).toBeVisible();
  });

  test("has no broken skip-to-main link", async ({ page }) => {
    await page.goto(BASE);
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test("FAQ accordion expands on click", async ({ page }) => {
    await page.goto(BASE);
    const faqButton = page.locator("button[aria-expanded]").first();
    await faqButton.scrollIntoViewIfNeeded();
    await faqButton.click();
    await expect(faqButton).toHaveAttribute("aria-expanded", "true");
  });
});

/* ── Services page navigation ─────────────────────────── */
test.describe("Services page", () => {
  test("navigates from home CTA to services", async ({ page }) => {
    await page.goto(BASE);
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL(/\/services/);
    const h1 = page.locator("h1").first();
    await expect(h1).toContainText("IT");
  });

  test("service detail accordion works", async ({ page }) => {
    await page.goto(`${BASE}/services`);
    const accordion = page.locator("button[aria-expanded]").first();
    await accordion.scrollIntoViewIfNeeded();
    await accordion.click();
    await expect(accordion).toHaveAttribute("aria-expanded", "true");
  });

  test("has HowTo section with process steps", async ({ page }) => {
    await page.goto(`${BASE}/services`);
    await expect(page.getByText("Discovery")).toBeVisible();
    await expect(page.getByText("Strategy")).toBeVisible();
    await expect(page.getByText("Execution")).toBeVisible();
    await expect(page.getByText("Delivery")).toBeVisible();
  });
});

/* ── Contact form submission ──────────────────────────── */
test.describe("Contact form", () => {
  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto(`${BASE}/contact`);
    await page.click('button[type="submit"]');
    // Expect at least one validation error to appear
    const errors = page.locator("p.text-xs.text-destructive");
    await expect(errors.first()).toBeVisible();
  });

  test("fills and submits the form", async ({ page }) => {
    await page.goto(`${BASE}/contact`);
    await page.fill('input[placeholder="Your full name"]', "Test User");
    await page.fill('input[placeholder="you@company.com"]', "test@example.com");
    await page.fill('input[placeholder="+91 XXXXX XXXXX"]', "+91 9999999999");
    await page.click('button[type="submit"]');
    // Toast should appear
    await expect(page.getByText("Message received!")).toBeVisible({ timeout: 5000 });
  });
});

/* ── Mobile menu open/close ───────────────────────────── */
test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await page.goto(BASE);
    const hamburger = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
    await expect(hamburger).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.goto(BASE);
    const hamburger = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').first();
    await hamburger.click();
    // Nav links should be visible
    await expect(page.locator('a[href="/services"]').first()).toBeVisible();
    // Close
    await hamburger.click();
  });
});

/* ── Blog post navigation ─────────────────────────────── */
test.describe("Blog posts", () => {
  test("navigates to a blog post from insights section", async ({ page }) => {
    await page.goto(BASE);
    const insightLink = page.locator('a[href^="/blog/"]').first();
    await insightLink.scrollIntoViewIfNeeded();
    const href = await insightLink.getAttribute("href");
    await insightLink.click();
    await expect(page).toHaveURL(new RegExp(href ?? "/blog/"));
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
