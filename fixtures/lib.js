const { test: baseTest } = require("@playwright/test");
const { LoginPage } = require("../page-objects/login-page");
const { HomePage } = require("../page-objects/home-page");
const { LeadsPage } = require("../page-objects/leads-page");
const { NewTaskPage } = require("../page-objects/new-task-page");

const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadsPage(page));
  },
  newTaskPage: async ({ page }, use) => {
    await use(new NewTaskPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  await page.close();
});

module.exports = test;
