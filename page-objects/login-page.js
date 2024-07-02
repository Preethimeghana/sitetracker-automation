const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

class LoginPage extends BasePage {

  get userInput() {
    return this.page.getByTestId('username');
  }

  get passwordInput() {
    return this.page.getByTestId('password');
  }

  get logInButton() {
    return this.page.getByTestId('Login');
  }

  get errorMessage() {
    return this.page.getByTestId('error');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle('Login | Salesforce');
  }

  async loginToApp(user = process.env.USER_NAME, password = process.env.USER_PASSWORD) {
    await this.userInput.click();
    await this.userInput.pressSequentially(user);
    await this.passwordInput.pressSequentially(password);
    await this.logInButton.click();
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toHaveText(`Please check your username and password. If you still can't log in, contact your Salesforce administrator.`);
  }
}

module.exports = { LoginPage };
