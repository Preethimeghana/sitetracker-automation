const test = require('../fixtures/lib');
const { DateTimeUtils } = require('../utils/date-time-utils');

const myLeadsPageUrl = "https://sitetracker-1a-dev-ed.develop.lightning.force.com/lightning/r/Lead/00Qak000005ntnCEAQ/view";

test('@e2e Verify new task for My Leads view', async ({ loginPage, leadPage, newTaskPage }) => {
  const todayDate = DateTimeUtils.currentDate('DD/MM/YYYY');
  const subjectName = 'Create Budget Plan';
  const comments = 'Budget for Q4';

  await loginPage.open(myLeadsPageUrl);
  await loginPage.loginToApp();
  await leadPage.verifyBettyBairPage();
  await leadPage.clickNewTask();
  await newTaskPage.fillNewTaskPopup(subjectName, todayDate, 'In Progress');
  await newTaskPage.clickSave(subjectName);
  await leadPage.verifyCreatedTask(subjectName);

  const futureDate = DateTimeUtils.addDaysToCurrentDate(7, 'DD/MM/YYYY');
  const futureSubjectName = 'Submit Budget Plan for Review';

  await leadPage.clickNewTask();
  await newTaskPage.fillNewTaskPopup(futureSubjectName, futureDate, 'Not Started');
  await newTaskPage.clickSave(futureSubjectName);
  await leadPage.verifyCreatedTask(futureSubjectName);

  await leadPage.expandCreatedTaskAndVerifyDescription(subjectName, '');
  await leadPage.editComments(subjectName, comments);
  await leadPage.expandCreatedTaskAndVerifyDescription(subjectName, comments);

  await leadPage.applyFilterForNextSevenDays();
  await leadPage.verifyCreatedTask(subjectName);
  await leadPage.verifyTaskNotDisplaying(futureSubjectName);

  await leadPage.clickShowAllActivities();
  await leadPage.verifyCreatedTask(subjectName);
  await leadPage.verifyCreatedTask(futureSubjectName);
});
