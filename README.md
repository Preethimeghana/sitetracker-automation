# PW-UI-AUTOMATION-FRAMEWORK

## Project Details

- `Tool      : Playwright`

- `Language  : JavaScript`

- `Reports   : Allure Report`

## To Get Started

### Pre-requisites
1. NodeJS installed globally in the system. https://nodejs.org/en/download/
    * Check the version of Node.js you have: `node --version`

2. Yarn installed globally in the system. https://yarnpkg.com/lang/en/docs/install#windows-stable
    * Check the version of Yarn you have: `yarn --version`

3. Download and install `Visual Studio Code` Editor. https://code.visualstudio.com/

4. Install allure command line tool using npm globally for allure report: 
    - `npm install -g allure-commandline --save-dev` (Allure requires Java 8 or higher)

## Setup Scripts

- Clone or download the repository into a folder

- Create `.env` file under root repository with following details:

```
APP_URL=https://sitetracker-1a-dev-ed.develop.my.salesforce.com/

USER_NAME=

USER_PASSWORD=
```

- Open the cloned/downloaded repository from root folder in `VS Code` editor.

- Open the terminal in `VS Code` using `ctrl+~` shortcut.

- `yarn install` - install all dependencies.

- `npx playwright install` - to install all the browser.

- Install extension `Playwright Test for VSCode` in `VS Code`

- To run the UI script on local browser using command line/terminal:

     - To run specific spec file in any specific module in test suite: 
       `npx playwright test spec_file_name.ts --headed`  e.g., demo.spec.ts

## Recording a test

- To record the test by performing action in the application
  `yarn playwright codegen` 

## Coding Guidelines

- All file name should follow the `kebab case` format ending with `.ts` extension.

- Test file name should end with `.spec.ts` preceding by `kebab case` e.g., `verify-login.spec.ts`

- All class name should follow `UpperCamelCase` for any pages or utils. e.g., `LoginPage`.

- All method or property name should follow `lowerCamelCase` for any pages or utils. e.g., `verifyHomePage`.

## References
1. Playwright Getting Started
https://playwright.dev/docs/intro
