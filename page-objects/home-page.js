const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class HomePage extends BasePage {
  get title() {
    return this.page.locator('div.onesetupBreadcrumbs');
  }
  
  get appLauncher() {
    return this.page.getByTitle('App Launcher');
  }
  
  get viewAllLink() {
    return this.page.locator(`lightning-button button:has-text('View All')`);
  }
  
  get appLauncherSearchInput() {
    return this.page.locator('one-app-launcher-modal input');
  }
  
  get leadsOption() {
    return this.page.locator(`lightning-accordion-section li:has-text('Leads')`);
  }
  
  async verifyHomePage() {
    await expect(this.page).toHaveTitle('Home | Salesforce');
    await expect(this.title).toContainText('Setup');
    await expect(this.title).toContainText('Home');
  }
  
  async navigateToLeadSection() {
    await this.appLauncher.hover();
    await this.appLauncher.click();
    await this.viewAllLink.click();
    await this.appLauncherSearchInput.pressSequentially('Leads');
    await this.leadsOption.click();
  }
}

module.exports = { HomePage };
