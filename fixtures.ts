// fixtures.ts
import { test as baseTest, Page, TestInfo, Locator } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// HTML 스냅샷 저장 로직
async function saveHtmlSnapshot(page: Page, testInfo: TestInfo, actionIndex: number, actionName: string = '', timestamp: string) {
  const testName = testInfo.title.replace(/\s+/g, '_');
  const snapshotDir = path.join('htmls', testName, timestamp);
  
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true });
  }

  // if (actionName === 'selectOption') {
  //   await page.waitForTimeout(200);
  // }
  await page.waitForTimeout(1000); //500은 너무 적은가 error가 남.
  await page.waitForLoadState('networkidle');

  const htmlContent = await page.content();
  const sequenceNum = actionIndex.toString().padStart(3, '0');
  const filePath = path.join(snapshotDir, `${sequenceNum}.html`);
  console.log(filePath);
  fs.writeFileSync(filePath, htmlContent);
}

// Locator 액션 오버라이드 함수
function overrideLocatorActions(locator: Locator, page: Page, testInfo: TestInfo, actionCounter: { value: number }, timestamp: string) {
  const overrideAction = async (originalMethod: Function, actionName: string, ...args: any[]) => {
    console.log(actionName);
    const result = await originalMethod.apply(locator, args);
    
    await saveHtmlSnapshot(page, testInfo, ++actionCounter.value, actionName, timestamp);
    return result;
  };

  // 클릭 액션 오버라이드
  const originalClick = locator.click.bind(locator);
  locator.click = async (options) => overrideAction(originalClick, 'click', options);

  // selectOption 액션 오버라이드
  const originalSelectOption = locator.selectOption.bind(locator);
  locator.selectOption = async (values, options) => 
    overrideAction(originalSelectOption, 'selectOption', values, options);

  // fill 액션 오버라이드
  // const originalFill = locator.fill.bind(locator);
  // locator.fill = async (value, options) => 
  //   overrideAction(originalFill, 'fill', value, options);

  // 추가 필요한 액션들도 여기에 추가
  return locator;
}

export const test = baseTest.extend<{
  trackActions: { enableHtmlSnapshots: boolean };
}>({
  trackActions: [{ enableHtmlSnapshots: true }, { option: true }],
  
  page: async ({ page, trackActions }, use, testInfo) => {
    const actionCounter = { value: 0 };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').slice(0, -5);

    if (trackActions.enableHtmlSnapshots) {
      // 페이지 액션 후크 (goto)
      const originalGoto = page.goto.bind(page);
      page.goto = async (url, options) => {
        console.log('goto');
        const response = await originalGoto(url, options);
        await saveHtmlSnapshot(page, testInfo, ++actionCounter.value, '', timestamp);
        return response;
      };

      // 기본 locator 메서드 오버라이드
      const originalLocator = page.locator.bind(page);
      page.locator = function(selector: string) {
        console.log('locator');
        const locator = originalLocator(selector);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };

      // getByRole 오버라이드
      const originalGetByRole = page.getByRole.bind(page);
      page.getByRole = function(role, options) {
        console.log('getByRole');
        const locator = originalGetByRole(role, options);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };

      // getByText 오버라이드
      const originalGetByText = page.getByText.bind(page);
      page.getByText = function(text, options) {
        console.log('getByText');
        const locator = originalGetByText(text, options);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };

      // getByLabel 오버라이드
      const originalGetByLabel = page.getByLabel.bind(page);
      page.getByLabel = function(text, options) {
        console.log('getByLabel');
        const locator = originalGetByLabel(text, options);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };

      // getByPlaceholder 오버라이드
      const originalGetByPlaceholder = page.getByPlaceholder.bind(page);
      page.getByPlaceholder = function(text, options) {
        console.log('getByPlaceholder');
        const locator = originalGetByPlaceholder(text, options);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };

      // getByTestId 오버라이드
      const originalGetByTestId = page.getByTestId.bind(page);
      page.getByTestId = function(testId) {
        console.log('getByTestId');
        const locator = originalGetByTestId(testId);
        return overrideLocatorActions(locator, page, testInfo, actionCounter, timestamp);
      };
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';