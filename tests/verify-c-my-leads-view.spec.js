const test = require('../fixtures/lib');
const { DateTimeUtils } = require('../utils/date-time-utils');

test("@e2e Verify End to End flow for My Leads view", async ({ loginPage, homePage, leadPage }) => {
  await loginPage.open()
  await loginPage.verifyTitle()
  await loginPage.loginToApp()
  await homePage.verifyHomePage()
  await homePage.navigateToLeadSection()
  await leadPage.verifyTitle()
  await leadPage.verifyMyLeadsView()
  await leadPage.verifyTotalLeadCount(DateTimeUtils.currentDate('MMM D, YYYY'))
  await leadPage.verifyTimePeriodFilter()
  await leadPage.selectBettyBairUnderLeadDropdown()
  await leadPage.verifyTitle('Betty Bair | Lead | Salesforce')
  await leadPage.verifyBettyBairPage()
  await leadPage.verifyBettyBairTabs(['activityTabTab', 'detailTabTab', 'collaborateTabTab'])
})