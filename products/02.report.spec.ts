import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

tcName = 'TC_WK_0003_Report_Web_WebRank_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebHostRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('button', { name: '전체' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('포털_검색');
  await page.getByRole('checkbox', { name: '포털_검색' }).check();
  await page.getByRole('button', { name: '포털_검색' }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('radio', { name: '접속 횟수' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  await expect(page.getByText('총 12개 중 1~12개')).toBeVisible();
});

tcName = 'TC_WK_0004_Report_Web_WebRank_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebHostRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('button', { name: '전체' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('포털_검색');
  await page.getByRole('checkbox', { name: '포털_검색' }).check();
  await page.getByRole('button', { name: '포털_검색' }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('radio', { name: '접속 횟수' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  // await expect(page.getByText('총 12개 중 1~12개')).toBeVisible();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickExcelExport').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0005_Report_Web_WebCategoryRank_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebCategoryRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('radio', { name: '접속 횟수' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  await expect(page.getByText('총 8개 중 1~8개')).toBeVisible();
});

tcName = 'TC_WK_0006_Report_Web_WebCategoryRank_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebCategoryRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('radio', { name: '접속 횟수' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  // await expect(page.getByText('총 8개 중 1~8개')).toBeVisible();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickExcelExport').getByText('엑셀 내보내기').click();
});

//이슈?: "검색포털" 카테고리가 있어야 할 것 같은데 없음. 일단 fail.
tcName = 'TC_WK_0007_Report_NetApp_NetAppsRank_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('button', { name: '전체' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('검색포털');
  await page.getByRole('checkbox', { name: '검색포털' }).check();
  await page.getByRole('button', { name: '검색포털' }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  await expect(page.getByText('총 2개 중 1~2개')).toBeVisible();
});

//이슈?: "검색포털" 카테고리가 있어야 할 것 같은데 없음. 일단 fail.
tcName = 'TC_WK_0008_Report_NetApp_NetAppsRank_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('button', { name: '전체' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('검색포털');
  await page.getByRole('checkbox', { name: '검색포털' }).check();
  await page.getByRole('button', { name: '검색포털' }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  // await expect(page.getByText('총 2개 중 1~2개')).toBeVisible();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickExcelExport').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0009_Report_NetApp_NetAppsCategoryRank_Search'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppCategoryRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  await expect(page.getByText('총 1개 중 1~1개')).toBeVisible();
});

tcName = 'TC_WK_0010_Report_NetApp_NetAppsCategoryRank_Export'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppCategoryRank.sms');

  //2025-02-26 ~ 2025-02-27
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();
  await page.getByRole('radio', { name: '허용' }).check();
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.waitForTimeout(500)
  // await expect(page.getByText('총 1개 중 1~1개')).toBeVisible();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#btnQuickExcelExport').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0011_Report_Custom_Web_Create_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebReportList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="templateName"]').fill('(TC_WK_0011_Report_Custom_Web_Create_Report) 자동화 생성용 리포트');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '26', exact: true }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByLabel('Select month').selectOption('2');
  await page.getByRole('link', { name: '27', exact: true }).click();

  await page.locator('select[name="outputType"]').selectOption('101');
  await page.getByRole('radio', { name: '전체' }).check();
  await page.getByRole('checkbox', { name: '카테고리' }).check();
  await page.getByRole('tab', { name: '카테고리 [리포트 대상]' }).locator('span').first().click();
  await page.getByRole('button', { name: '전체 추가' }).click();
  await page.locator('select[name="searchType"]').selectOption('0');
  await page.locator('select[name="frequencyType"]').selectOption('0');

  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0012_Report_Custom_Web_Modify_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebReportList.sms');

  await page.getByRole('link', { name: '(TC_WK_0012_Report_Custom_Web_Modify_Report) 자동화 수정용 리포트' }).click();
  await page.locator('input[name="templateName"]').click();
  await page.locator('input[name="templateName"]').fill('(TC_WK_0012_Report_Custom_Web_Modify_Report) 자동화 수정용 리포트 (수정완료)');
  await page.getByRole('button', { name: '오늘' }).click();
  await page.locator('select[name="outputType"]').selectOption('114');
  await page.getByRole('checkbox', { name: '카테고리' }).uncheck();
  await page.getByRole('checkbox', { name: '허용/차단' }).check();
  // await page.getByRole('tab', { name: '카테고리 선택 항목별 리포트 분리' }).click();
  // await page.getByRole('button', { name: '전체 추가' }).click();
  await page.locator('#action').getByText('허용/차단').click();
  await page.getByRole('row', { name: '차단(카테고리) 추가' }).getByRole('button').click();
  await page.getByRole('row', { name: '차단(포스트 크기) 추가' }).getByRole('button').click();
  await page.getByRole('button', { name: '추가' }).click();
  // await page.getByRole('row', { name: '허용' }).click();
  // await page.getByRole('row', { name: '허용', exact: true }).click();

  await page.locator('select[name="searchType"]').selectOption('1');
  await page.locator('select[name="frequencyType"]').selectOption('1');

  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('link', { name: '(TC_WK_0012_Report_Custom_Web_Modify_Report) 자동화 수정용 리포트 (수정완료)' })).toBeVisible();
});

tcName = 'TC_WK_0013_Report_Custom_Web_Delete_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetWebReportList.sms');
  await page.getByRole('link', { name: '(TC_WK_0013_Report_Custom_Web_Delete_Report) 자동화 삭제용 리포트' }).click();
  await page.locator('#btn_delete').click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('link', { name: '(TC_WK_0013_Report_Custom_Web_Delete_Report) 자동화 삭제용 리포트' })).not.toBeVisible();
});

tcName = 'TC_WK_0014_Report_Custom_NetApp_Create_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppsReportList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="templateName"]').fill('(TC_WK_0014_Report_Custom_NetApp_Create_Report) 자동화 생성용 리포트');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#tb_start_dt').click();
  await page.getByRole('link', { name: '26' }).click();
  await page.locator('#tb_end_dt').click();
  await page.getByRole('link', { name: '27' }).click();
  await page.locator('select[name="outputType"]').selectOption('103');
  await page.getByRole('radio', { name: '상위' }).check();
  await page.locator('#searchCount').fill('10')
  await page.getByRole('checkbox', { name: '넷앱' }).check();
  await page.locator('#program').getByText('넷앱').click();
  await page.getByRole('button', { name: '전체 추가' }).click();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0015_Report_Custom_NetApp_Modify_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppsReportList.sms');
  await page.getByRole('link', { name: '(TC_WK_0015_Report_Custom_NetApp_Modify_Report) 자동화 수정용 리포트' }).click();
  await page.locator('input[name="templateName"]').click();
  await page.locator('input[name="templateName"]').fill('(TC_WK_0015_Report_Custom_NetApp_Modify_Report) 자동화 수정용 리포트 (수정완료)');
  await page.getByRole('button', { name: '오늘' }).click();
  await page.locator('select[name="outputType"]').selectOption('106');
  await page.getByRole('radio', { name: '전체' }).check();
  await page.getByRole('checkbox', { name: '넷앱' }).uncheck();
  await page.getByRole('checkbox', { name: '사용자', exact: true }).check();
  await page.getByRole('tab', { name: '사용자 [리포트 대상]' }).locator('span').first().click();
  await page.getByRole('button', { name: '전체 추가' }).click();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('link', { name: '(TC_WK_0015_Report_Custom_NetApp_Modify_Report) 자동화 수정용 리포트 (수정완료)' })).toBeVisible();
});

tcName = 'TC_WK_0016_Report_Custom_NetApp_Delete_Report'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppsReportList.sms');
  await page.getByRole('row', { name: '(TC_WK_0016_Report_Custom_NetApp_Delete_Report) 자동화 삭제용 리포트' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await expect(page.getByRole('link', { name: '(TC_WK_0016_Report_Custom_NetApp_Delete_Report) 자동화 삭제용 리포트' })).not.toBeVisible();
});

//두 url 중에 뭘 써야하는데? 그리고 뭘 테스트해야하는데?
tcName = 'TC_WK_0017_Report_ReportsForCustomers'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetNetAppsReportList.sms');
  await page.waitForTimeout(500)
  await page.goto(baseURL + 'newCustomReportList.sms');
  await page.waitForTimeout(500)
});