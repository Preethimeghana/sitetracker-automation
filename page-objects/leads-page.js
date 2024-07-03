const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class LeadsPage extends BasePage {

  get headerComponent() {
    return this.page.locator(`[class*='page-header'] [class*='body']`);
  }

  get pageHeader() {
    return this.headerComponent.locator(`p`);
  }

  get subTitle() {
    return this.headerComponent.locator(`h1 span`).nth(1);
  }

  get myLeadDropdownIcon() {
    return this.page.getByTitle('Select a List View: Leads');
  }

  get totalLeadCount() {
    return this.page.locator(`[data-api-name='TotalLead'] p`);
  }

  get createdDate() {
    return this.page.getByTitle('Time Period Filter');
  }

  get menuLeadDropdown() {
    return this.page.locator(`//span[text()='Leads']/parent::*/following-sibling::*//*[contains(@class,'dropdown')]`);
  }

  get bettyBairOption() {
    return this.page.locator(`[role='menuitem'] span:has-text('Betty Bair')`);
  }

  get bettyBairTitle() {
    return this.page.locator(`[class*="entityNameTitle"] records-entity-label`);
  }

  get bettyBairSubtitle() {
    return this.page.locator(`[class*="entityNameTitle"] + * lightning-formatted-name`);
  }

  get newTask() {
    return this.page.locator(`[title='New Task'] [value='NewTask']`);
  }

  get description() {
    return this.page.getByTitle('Description');
  }

  get descriptionValue() {
    return this.page.locator(`[title='Description'] + *`);
  }

  createdTask(taskName) {
    return this.page.locator(`a[title='${taskName}']`);
  }

  expandArrowIconByTaskName(taskName) {
    return this.page.locator(`//a[@title='${taskName}']/ancestor::li//*[contains(@class,'chevronLink')]`).nth(0);
  }

  moreActionByTaskName(taskName) {
    return this.page.locator(`//a[@title='${taskName}']/ancestor::li//*[contains(@class,'rowActionsPlaceHolder')]`).nth(0);
  }

  get editCommentsOption() {
    return this.page.getByTitle('Edit Comments').nth(-1);
  }

  get deleteOption() {
    return this.page.getByTitle('Delete');
  }

  get commentsTextarea() {
    return this.page.locator(`[aria-describedby='quickTextKeyboardTip']`);
  }

  get saveButtonForCommentPopup() {
    return this.page.locator(`[class*='modal-footer'] button span:has-text('Save')`);
  }

  get settingIconForActivityTab() {
    return this.page.locator(`[title="Timeline Settings"]`);
  }

  get nextSevenDaysRadioButton() {
    return this.page.locator(`//*[text()='Next 7 days']/preceding-sibling::span[contains(@class,'radio')]`);
  }

  get applyButton() {
    return this.page.locator(`[class*='modal'] button:has-text('Apply')`);
  }

  get appliedFilter() {
    return this.page.locator(`//*[contains(text(),'Filters: Next 7 days')]`);
  }

  get showAllActivities() {
    return this.page.locator(`button:has-text('Show All Activities')`);
  }

  get confirmDelete() {
    return this.page.locator(`[class*='modal-footer'] button:has-text('Delete')`);
  }

  async verifyTitle(text = 'Lead Intelligence View | Leads | Salesforce') {
    await expect(this.page).toHaveTitle(text);
  }

  async verifyMyLeadsView() {
    await expect(this.pageHeader).toHaveText('Leads');
    await expect(this.subTitle).toHaveText('My Leads');
  }

  async verifyTotalLeadCount() {
    await expect(this.totalLeadCount).toHaveCount(2);
    await expect(this.totalLeadCount.nth(0)).toHaveText('Total Leads');
    await expect(this.totalLeadCount.nth(1)).toHaveText('22');
  }

  async clickMyLeadIcon() {
    await this.myLeadDropdownIcon.click();
  }

  async verifyTimePeriodFilter(todayDate) {
    await expect(this.createdDate).toHaveText(`Jan 1, 2024 - ${todayDate}`);
  }

  async selectBettyBairUnderLeadDropdown() {
    await this.menuLeadDropdown.hover();
    await this.menuLeadDropdown.click();
    await this.bettyBairOption.nth(0).click();
  }

  async verifyBettyBairPage() {
    await expect(this.bettyBairTitle).toHaveText('Lead');
    await expect(this.bettyBairSubtitle).toHaveText('Ms Betty Bair');
  }

  async verifyBettyBairTabs(tabs) {
    for (let tab of tabs) {
      await expect(this.page.locator(`[data-target-selection-name='${tab}']`)).toBeVisible();
    }
  }

  async clickNewTask() {
    await this.newTask.click();
  }

  async verifyCreatedTask(taskName) {
    await expect(this.createdTask(taskName).nth(0)).toBeVisible();
  }

  async verifyTaskNotDisplaying(taskName) {
    await expect(this.createdTask(taskName).nth(0)).not.toBeVisible();
  }

  async expandCreatedTaskAndVerifyDescription(taskName, descriptionValue) {
    await this.expandArrowIconByTaskName(taskName).click();
    await expect(this.description).toHaveText('Description');
    await expect(this.descriptionValue).toHaveText(descriptionValue);
  }

  async editComments(taskName, comments) {
    await this.moreActionByTaskName(taskName).hover();
    await this.moreActionByTaskName(taskName).click();
    await this.editCommentsOption.click();
    await this.commentsTextarea.click();
    await this.commentsTextarea.pressSequentially(comments);
    await this.saveButtonForCommentPopup.click();
    await expect(this.successMessage).toContainText(`Task "${taskName}" was saved.`);
    await expect(this.successMessage).not.toBeVisible();
  }

  async applyFilterForNextSevenDays() {
    await this.settingIconForActivityTab.click();
    await this.nextSevenDaysRadioButton.click();
    await this.applyButton.nth(1).click();
    await expect(this.appliedFilter).toBeVisible();
  }

  async clickShowAllActivities() {
    await this.showAllActivities.click();
  }

  async deleteCreatedTask(taskName) {
    await this.moreActionByTaskName(taskName).hover();
    await this.moreActionByTaskName(taskName).click();
    await this.deleteOption.nth(0).click();
    await this.confirmDelete.hover();
    await this.confirmDelete.click();
    await this.verifyTaskNotDisplaying(taskName);
  }
}

module.exports = { LeadsPage };
