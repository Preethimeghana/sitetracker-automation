// @ts-check
const { defineConfig, devices } = require("@playwright/test");
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let appUrl = process.env.APP_URL;

module.exports = defineConfig({
  // Timeout per test/spec - 10min
  timeout: 60000 * 10,

  testDir: "tests/",

  expect: {
    timeout: 60000 * 1,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Run in parallel instance */
  workers: 1,

  reporter: [
    [
      `allure-playwright`,
      {
        outputFolder: "report/allure/",
        open: "never",
        environmentInfo: {
          ENV: appUrl,
        },
      },
    ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 60000 * 2,

    baseURL: appUrl,

    trace: "on-first-retry",

    screenshot: "on",

    testIdAttribute: "id",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1536, height: 730 },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1536, height: 730 },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1536, height: 730 },
      },
    },
    {
      name: "MicrosoftEdge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 1536, height: 730 },
      },
    },
    {
      name: "GoogleChrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1536, height: 730 },
      },
    },
  ],

  outputDir: "report/test-results/",
});
