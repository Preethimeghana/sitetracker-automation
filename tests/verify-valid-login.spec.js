const test = require('../fixtures/lib');

test("@smoke Verify valid login", async ({ loginPage, homePage }) => {
  await loginPage.open()
  await loginPage.verifyTitle()
  await loginPage.loginToApp()
  await homePage.verifyHomePage()
})