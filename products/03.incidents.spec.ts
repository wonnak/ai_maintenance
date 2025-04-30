import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* 로그 조회 */
tcName = 'TC_WK_0018_Incidents_Web_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'incidentsWebList.sms');
  
  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();

  await page.locator('input[name="keyword"]').fill('"호스트 like":naver');
  // await page.locator('input[name="keyword"]').press('Enter');
  await page.getByRole('button', { name: '검색' }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('총 56개 중 1~50개')).toBeVisible();
});

tcName = 'TC_WK_0019_Incidents_Web_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'incidentsWebList.sms');
  
  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();

  await page.locator('input[name="keyword"]').fill('"호스트 like":naver');
  await page.locator('input[name="keyword"]').press('Enter');
  await page.getByRole('button', { name: '검색' }).click();
  await page.waitForTimeout(1000)
  //await expect(page.getByText('총 56개 중 1~50개')).toBeVisible();

  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickScheduleExcel').getByText('엑셀 내보내기').click();
  await page.waitForTimeout(1000)
  await page.locator('input[name="export_name"]').fill('(TC_WK_0019_Incidents_Web_Export) 자동화 웹 내보내기');
  await page.locator('#insertButtonAll').click();
  await page.locator('#pop_btn_wrap').getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0020_Incidents_NetAppsHttps_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'incidentsNetAppsList.sms');
  
  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();

  await page.locator('input[name="keyword"]').fill('"사용자 이름":자동화 로깅용 사용자');
  await page.locator('input[name="keyword"]').press('Enter');
  await page.getByRole('listitem').filter({ hasText: ' 넷앱 가상화폐거래_' }).getByRole('button').click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('검색포털');
  await page.getByRole('checkbox', { name: '검색포털' }).check();
  await page.getByRole('button', { name: '검색포털' }).click();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await expect(page.getByText('총 8개 중 1~8개')).toBeVisible();
});

tcName = 'TC_WK_0021_Incidents_NetAppsHttps_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'incidentsNetAppsList.sms');
  
  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();

  await page.locator('input[name="keyword"]').fill('"사용자 이름":자동화 로깅용 사용자');
  await page.locator('input[name="keyword"]').press('Enter');
  await page.getByRole('listitem').filter({ hasText: ' 넷앱 가상화폐거래_' }).getByRole('button').click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('검색포털');
  await page.getByRole('checkbox', { name: '검색포털' }).check();
  await page.getByRole('button', { name: '검색포털' }).click();
  await page.getByRole('button', { name: '검색', exact: true }).click();
//   await expect(page.getByText('총 8개 중 1~8개')).toBeVisible();

  await page.waitForTimeout(1000)
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickScheduleExcel').getByText('엑셀 내보내기').click();
  await page.waitForTimeout(1000)
  await page.locator('input[name="export_name"]').fill('(TC_WK_0021_Incidents_NetAppsHttps_Export) 자동화 웹 내보내기');
  await page.locator('#insertButtonAll').click();
  await page.locator('#pop_btn_wrap').getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  
});

tcName = 'TC_WK_0022_Incidents_ExportResult'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'incidentsNetworkExportList.sms');
  await expect(page.getByText('(TC_WK_0022_Incidents_ExportResult) 자동화 내보내기 이력 확인용')).toBeVisible();
});
