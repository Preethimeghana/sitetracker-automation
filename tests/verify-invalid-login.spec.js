const test = require('../fixtures/lib');

test('@smoke Verify error message for invalid login credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.verifyTitle();
  await loginPage.loginToApp('xyz@gmail.com', '128xcnck@1208');
  await loginPage.verifyErrorMessage();
});
