const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class NewTaskPage extends BasePage {

  assignedToDropdown(name) {
    return this.page.locator(`//span[text()='Assigned To']/parent::label/following-sibling::*//a//span[text()='${name}']`);
  }

  nameDropdown(name) {
    return this.page.locator(`//span[text()='Name']/parent::label/following-sibling::*//a//span[text()='${name}']`);
  }

  inputByLabel(label) {
    return this.page.locator(`//label[text()='${label}']/following-sibling::*//input`);
  }

  statusOption(option) {
    return this.page.locator(`//ul//a[contains(text(),'${option}')]`);
  }

  get relatedToInput() {
    return this.page.locator(`//span[text()='Related To']/parent::label/following-sibling::*//input`);
  }

  get statusDropdown() {
    return this.page.locator(`//span[text()='Status']/parent::*/following-sibling::*//*[@class='select']`);
  }

  get saveButton() {
    return this.page.locator(`[class*='publisherShareButton'] span:has-text('Save')`);
  }

  async fillSubjectInput(value) {
    await this.inputByLabel('Subject').pressSequentially(value);
  }

  async selectDueDate(dueDate) {
    await this.inputByLabel('Due Date').pressSequentially(dueDate);
  }

  async verifyNameDropdown(text = 'Betty Bair') {
    await expect(this.nameDropdown(text)).toBeVisible();
  }

  async verifyRelatedToInput() {
    await expect(this.relatedToInput).toBeVisible();
  }

  async verifyAssignedTo() {
    await expect(this.assignedToDropdown('QA Admin')).toBeVisible();
  }

  async selectStatus(status) {
    await this.statusDropdown.hover();
    await this.statusDropdown.click();
    await this.statusOption(status).click();
  }

  async fillNewTaskPopup(subject, dueDate, status) {
    await this.verifyNameDropdown();
    await this.verifyRelatedToInput();
    await this.verifyAssignedTo();
    await this.fillSubjectInput(subject);
    await this.selectDueDate(dueDate);
    await this.selectStatus(status);
  }

  async clickSave(name) {
    await this.saveButton.click();
    await expect(this.successMessage).toContainText(`Task "${name}" was created.`);
    await expect(this.successMessage).not.toBeVisible();
  }
}

module.exports = { NewTaskPage };
