const { Page, Locator } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  get successMessage() {
    return this.page.locator(`[class*='toastMessage']`);
  }

  async open(url = "/") {
    await this.page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
    await this.page.route("/(analytics|fonts)/", (route) => route.abort());
    await this.page.goto(url);
  }
}

module.exports = { BasePage };
