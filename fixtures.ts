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
  await page.waitForTimeout(3000); //500은 너무 적은가 error가 남.
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

// 테스트 종료 시 실행되는 훅
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    const testName = testInfo.title.replace(/\s+/g, '_');
    const htmlsPath = path.join('htmls', testName);
    const lastSuccessPath = path.join(htmlsPath, 'lastSuccessHtmls');

    // htmls 폴더가 존재하는지 확인
    if (fs.existsSync(htmlsPath)) {
      // 가장 최근 폴더 찾기 (lastSuccessHtmls 폴더는 제외)
      const folders = fs.readdirSync(htmlsPath)
        .filter(item => {
          const itemPath = path.join(htmlsPath, item);
          return fs.statSync(itemPath).isDirectory() && item !== 'lastSuccessHtmls';
        })
        .sort((a, b) => {
          // 문자열 날짜 형식이 "2025-04-17_04-43-33"와 같으므로
          // 단순 문자열 비교로 정렬 (내림차순)
          return b.localeCompare(a);
        });

      if (folders.length > 0) {
        const latestFolder = folders[0];
        const sourcePath = path.join(htmlsPath, latestFolder);

        // lastSuccessHtmls 폴더가 있으면 명시적으로 삭제
        if (fs.existsSync(lastSuccessPath)) {
          console.log(`Removing existing lastSuccessHtmls folder: ${lastSuccessPath}`);
          fs.rmSync(lastSuccessPath, { recursive: true, force: true });
        }

        // lastSuccessHtmls 폴더 생성 (htmls/testName/ 경로에만 생성)
        fs.mkdirSync(lastSuccessPath, { recursive: true });
        console.log(`Created lastSuccessHtmls folder: ${lastSuccessPath}`);

        // HTML 파일들을 개별적으로 복사 (하위 디렉토리는 복사하지 않음)
        const htmlFiles = fs.readdirSync(sourcePath)
          .filter(file => file.endsWith('.html') && !fs.statSync(path.join(sourcePath, file)).isDirectory());

        for (const file of htmlFiles) {
          const sourceFile = path.join(sourcePath, file);
          const targetFile = path.join(lastSuccessPath, file);
          fs.copyFileSync(sourceFile, targetFile);
        }

        console.log(`Copied latest HTML snapshots from ${sourcePath} to ${lastSuccessPath}`);
      }
    }
  }
});

export { expect } from '@playwright/test';