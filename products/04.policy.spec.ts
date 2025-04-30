import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* 정책 */
tcName = 'TC_WK_0023_Policies_WebNetAppsHttps_Create_Policies'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyInternetList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('#policyName').fill('(TC_WK_0023_Policies_WebNetAppsHttps_Create_Policies) 자동화 생성용 정책');
  await page.getByRole('button', { name: '선택', exact: true }).click();
  await page.getByRole('link', { name: '자동화 정책용 사용자 1(policy_user_1)' }).click();
  await page.getByRole('button', { name: '확인' }).click();

  //웹 설정: '포털_검색' 차단 이외에 전체 허용
  await page.locator('label:nth-child(2) > i').first().click();
  await page.locator('.ui-accordion-header-icon').first().click();
  await page.getByRole('listitem').filter({ hasText: '포털_검색 ' }).locator('i').first().click();

  //넷앱 설정: '소셜미디어' 차단 이외에 전체 허용
  await page.locator('#ui-id-3 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-5 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-7 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-9 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-11 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-13 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-15 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-17 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-19 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-21 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-23 > .editMode > .btn-group > label:nth-child(3) > i').first().click();
  await page.locator('#ui-id-25 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-27 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-29 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-31 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-33 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-35 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-37 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-39 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-41 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-43 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-45 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-47 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-49 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-51 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-53 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-55 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '정책 적용' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0024_Policies_WebNetAppsHttps_Modify_Policies'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyInternetList.sms');

  await page.getByText(`(TC_WK_0024_Policies_WebNetAppsHttps_Modify_Policies) 자동화 수정용 정책`).click();
  await page.locator('#policyName').fill(`(TC_WK_0024_Policies_WebNetAppsHttps_Modify_Policies) 자동화 수정용 정책 (수정완료)`);
  await page.getByRole('button', { name: '선택', exact: true }).click();
  await page.getByRole('row', { name: '사용자 자동화 정책용 사용자 1(' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '선택 삭제' }).click();
  await page.locator('#divConfirm').getByRole('button', { name: '확인' }).click();
  await page.getByRole('link', { name: '자동화 정책용 사용자 2(policy_user_2)' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('label:nth-child(2) > i').first().click();
  await page.locator('#ui-id-23 > .editMode > .btn-group > label:nth-child(2) > i').first().click();
  await page.getByRole('cell', { name: '넷앱 설정' }).click(); //저장 버튼을 가리길래 임의의 요소 클릭
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText(`(TC_WK_0024_Policies_WebNetAppsHttps_Modify_Policies) 자동화 수정용 정책 (수정완료)`)).toBeVisible();
});

tcName = 'TC_WK_0025_Policies_WebNetAppsHttps_Delete_Policies'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyInternetList.sms');
  await page.getByText(`(TC_WK_0025_Policies_WebNetAppsHttps_Delete_Policies) 자동화 삭제용 정책`).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText(`(TC_WK_0025_Policies_WebNetAppsHttps_Delete_Policies) 자동화 삭제용 정책`)).not.toBeVisible();
});

tcName = 'TC_WK_0026_Policies_WebNetAppsHttps_Search_Policies'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyInternetList.sms');
  await page.locator('input[name="policyName"]').fill(`(TC_WK_0026_Policies_WebNetAppsHttps_Search_Policies) 자동화 검색용 정책`);
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('input[name="policyName"]').click();
  await expect(page.getByText(`(TC_WK_0026_Policies_WebNetAppsHttps_Search_Policies) 자동화 검색용 정책`)).toBeVisible();
});

tcName = 'TC_WK_0027_Policies_WebNetAppsHttps_Export_Policies'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyInternetList.sms');

  await page.getByRole('row', { name: `(TC_WK_0027_Policies_WebNetAppsHttps_Export_Policies) 내보내기용 정책 - 1` }).getByRole('checkbox').check();
  await page.getByRole('row', { name: `(TC_WK_0027_Policies_WebNetAppsHttps_Export_Policies) 내보내기용 정책 - 2` }).getByRole('checkbox').check();
  await page.getByRole('row', { name: `(TC_WK_0027_Policies_WebNetAppsHttps_Export_Policies) 내보내기용 정책 - 3` }).getByRole('checkbox').check();

  await page.getByRole('button', { name: '내보내기' }).click();
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0028_Policies_HTTP_Create_Policies'
test.skip(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyHTTPList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('#policyName').fill(`(TC_WK_0028_Policies_HTTP_Create_Policies) 자동화 생성용 정책`);
  await page.getByRole('button', { name: '선택' }).first().click();
  await page.getByRole('link', { name: '자동화 정책용 사용자 1(policy_user_1)' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('combobox').selectOption('http:method');
  await page.locator('input[name="queryBuilderRequest_rule_0_value_0"]').fill('GET');
  await page.getByRole('radio', { name: '차단 차단' }).check();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '정책 적용' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0029_Policies_HTTP_Modify_Policies'
test.skip(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyHTTPList.sms');
  await page.getByRole('gridcell', { name: `(TC_WK_0029_Policies_HTTP_Modify_Policies) 자동화 수정용 정책` }).locator('a').click();
  await page.locator('#policyName').fill(`(TC_WK_0029_Policies_HTTP_Modify_Policies) 자동화 수정용 정책 (수정완료)`);
  await page.getByRole('list').filter({ hasText: ' 0 1 선택 ' }).getByRole('button').click();
  await page.getByRole('row', { name: '사용자 자동화 정책용 사용자 1(policy_user_1)' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '선택 삭제' }).click();
  await page.locator('#divConfirm').getByRole('button', { name: '확인' }).click();
  await page.getByRole('link', { name: '자동화 정책용 사용자 2(policy_user_2)' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('#policyForm div').filter({ hasText: ' HTTP' }).nth(3).click(); //저장 버튼을 가릴까봐.
  await page.getByRole('radio', { name: '응답 응답' }).check();
  await page.getByRole('combobox').selectOption('http:method');
  await page.locator('select[name="queryBuilderResponse_rule_0_operator"]').selectOption('wildcard');
  await page.locator('input[name="queryBuilderResponse_rule_0_value_0"]').fill('POST*');
  await page.getByRole('radio', { name: '허용 허용' }).check();
  await page.locator('textarea[name="policyHttp\\.policyDesc"]').click();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '정책 적용' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('gridcell', { name: '(TC_WK_0029_Policies_HTTP_Modify_Policies) 자동화 수정용 정책 (수정완료)', exact: true })).toBeVisible();
});

tcName = 'TC_WK_0030_Policies_HTTP_Delete_Policies'
test.skip(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyHTTPList.sms');
  await page.getByRole('gridcell', { name: `(TC_WK_0030_Policies_HTTP_Delete_Policies) 자동화 삭제용 정책` }).locator('a').click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('gridcell', { name: `(TC_WK_0030_Policies_HTTP_Delete_Policies) 자동화 삭제용 정책`, exact:true })).not.toBeVisible();
});

tcName = 'TC_WK_0031_Policies_HTTP_Search_Policies'
test.skip(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyHTTPList.sms');

  await page.locator('input[name="policyName"]').fill(`(TC_WK_0031_Policies_HTTP_Search_Policies) 자동화 검색용 정책`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('gridcell', { name: `(TC_WK_0031_Policies_HTTP_Search_Policies) 자동화 검색용 정책`, exact:true })).toBeVisible();
});

tcName = 'TC_WK_0032_Policies_HTTP_Export_Policies'
test.skip(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyHTTPList.sms');

  await page.getByRole('row', { name: `(TC_WK_0032_Policies_HTTP_Export_Policies) 자동화 내보내기용 정책 - 1` }).getByRole('checkbox').check();
  await page.getByRole('row', { name: `(TC_WK_0032_Policies_HTTP_Export_Policies) 자동화 내보내기용 정책 - 2` }).getByRole('checkbox').check();
  await page.getByRole('row', { name: `(TC_WK_0032_Policies_HTTP_Export_Policies) 자동화 내보내기용 정책 - 3` }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '내보내기' }).click();
});

tcName = 'TC_WK_0033_Policies_Detect_Create_WebCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'webCategoryInfoList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.getByRole('textbox').fill(`TC_WK_0033_Policies_Detect_Create_WebCategory`);
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('TC_WK_0033_Policies_Detect_Create_WebCategory')).toBeVisible();
});

tcName = 'TC_WK_0034_Policies_Detect_Modify_WebCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'webCategoryInfoList.sms');
  await page.getByText(`TC_WK_0034_Policies_Detect_Modify_WebCategory`).click();
  await page.getByRole('textbox').fill(`TC_WK_0034_Policies_Detect_Modify_WebCategory (완)`);
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('TC_WK_0034_Policies_Detect_Modify_WebCategory (완)')).toBeVisible();
});

tcName = 'TC_WK_0035_Policies_Detect_Delete_WebCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'webCategoryInfoList.sms');
  await page.getByText(`TC_WK_0035_Policies_Detect_Delete_WebCategory`).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('TC_WK_0035_Policies_Detect_Delete_WebCategory')).not.toBeVisible();
});

tcName = 'TC_WK_0036_Policies_Detect_Search_WebCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'webCategoryInfoList.sms');
  await page.getByRole('textbox').fill(`TC_WK_0036_Policies_Detect_Search_WebCategory`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText(`TC_WK_0036_Policies_Detect_Search_WebCategory`)).toBeVisible();
});

tcName = 'TC_WK_0037_Policies_Detect_Create_NetAppCategory_UserdefNetApp'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 넷앱').click();

  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="netAppsServiceName"]').fill('(TC_WK_0037_Policies_Detect_Create_NetAppCategory_UserdefNetApp) 자동화 생성용 넷앱');
  await page.locator('input[name="startIP"]').fill('10.0.5.1');
  await page.locator('input[name="endIP"]').fill('10.0.5.255');
  await page.getByRole('checkbox', { name: '모든 포트' }).check();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('(TC_WK_0037_Policies_Detect_Create_NetAppCategory_UserdefNetApp) 자동화 생성용 넷앱')).toBeVisible();
});

tcName = 'TC_WK_0038_Policies_Detect_Modify_NetAppCategory_UserdefNetApp'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 넷앱').click();
 
  await page.getByText(`(TC_WK_0038_Policies_Detect_Modify_NetAppCategory_UserdefNetApp) 자동화 수정용 넷앱`).click();
  await page.locator('input[name="netAppsServiceName"]').fill(`(TC_WK_0038_Policies_Detect_Modify_NetAppCategory_UserdefNetApp) 자동화 수정용 넷앱 (수정완료)`);
  await page.locator('input[name="startIP"]').fill('10.0.1.1');
  await page.locator('input[name="endIP"]').fill('10.0.1.255');
  await page.getByRole('checkbox', { name: '모든 포트' }).uncheck();
  await page.locator('input[name="startPort"]').fill('1');
  await page.locator('input[name="endPort"]').fill('10000');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText(`(TC_WK_0038_Policies_Detect_Modify_NetAppCategory_UserdefNetApp) 자동화 수정용 넷앱 (수정완료)`)).toBeVisible();
});

tcName = 'TC_WK_0039_Policies_Detect_Delete_NetAppCategory_UserdefNetApp'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 넷앱').click();
 
  await page.getByText(`(TC_WK_0039_Policies_Detect_Delete_NetAppCategory_UserdefNetApp) 자동화 삭제용 넷앱`).click();
  await page.getByRole('button', { name: '강제 삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText(`(TC_WK_0039_Policies_Detect_Delete_NetAppCategory_UserdefNetApp) 자동화 삭제용 넷앱`)).not.toBeVisible();
});

tcName = 'TC_WK_0040_Policies_Detect_Search_NetAppCategory_UserdefNetApp'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 넷앱').click();
 
  await page.locator('#netAppsServiceName').fill(`(TC_WK_0040_Policies_Detect_Search_NetAppCategory_UserdefNetApp) 자동화 검색용 넷앱`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText(`(TC_WK_0040_Policies_Detect_Search_NetAppCategory_UserdefNetApp) 자동화 검색용 넷앱`)).toBeVisible();
});

tcName = 'TC_WK_0041_Policies_Detect_Export_NetAppCategory_UserdefNetApp'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 넷앱').click();
 
  await page.locator('#netAppsServiceName').fill(`(TC_WK_0041_Policies_Detect_Export_NetAppCategory_UserdefNetApp) 자동화 내보내기용 넷앱`);
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0042_Policies_Detect_Create_NetAppCategory_UserdefHTTPS'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 HTTPS').click();
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="netAppsServiceName"]').fill(`(TC_WK_0042_Policies_Detect_Create_NetAppCategory_UserdefHTTPS) 자동화 생성용 넷앱`);
  await page.locator('input[name="netAppsList\\.cn"]').fill('netapp-creation.com');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText(`(TC_WK_0042_Policies_Detect_Create_NetAppCategory_UserdefHTTPS) 자동화 생성용 넷앱`)).toBeVisible();
});

tcName = 'TC_WK_0043_Policies_Detect_Modify_NetAppCategory_UserdefHTTPS'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 HTTPS').click();
  await page.getByText(`(TC_WK_0043_Policies_Detect_Modify_NetAppCategory_UserdefHTTPS) 자동화 수정용 넷앱`).click();
  await page.locator('input[name="netAppsServiceName"]').fill(`(TC_WK_0043_Policies_Detect_Modify_NetAppCategory_UserdefHTTPS) 자동화 수정용 넷앱 (수정완료)`);
  await page.locator('input[name="netAppsList\\.cn"]').fill('netapp-modification.com.complete');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText(`(TC_WK_0043_Policies_Detect_Modify_NetAppCategory_UserdefHTTPS) 자동화 수정용 넷앱 (수정완료)`)).toBeVisible();
});

tcName = 'TC_WK_0044_Policies_Detect_Delete_NetAppCategory_UserdefHTTPS'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 HTTPS').click();
  
  await page.getByText(`(TC_WK_0044_Policies_Detect_Delete_NetAppCategory_UserdefHTTPS) 자동화 삭제용 넷앱`).click();
  await page.getByRole('button', { name: '삭제', exact: true }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
});

tcName = 'TC_WK_0045_Policies_Detect_Search_NetAppCategory_UserdefHTTPS'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 HTTPS').click();
  
  await page.locator('#netAppsServiceName').fill(`(TC_WK_0045_Policies_Detect_Search_NetAppCategory_UserdefHTTPS) 자동화 검색용 넷앱`); 
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText(`(TC_WK_0045_Policies_Detect_Search_NetAppCategory_UserdefHTTPS) 자동화 검색용 넷앱`)).toBeVisible();
});

tcName = 'TC_WK_0046_Policies_Detect_Export_NetAppCategory_UserdefHTTPS'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('사용자 정의 HTTPS').click();
  
  await page.locator('#netAppsServiceName').fill(`(TC_WK_0046_Policies_Detect_Export_NetAppCategory_UserdefHTTPS) 자동화 내보내기용 넷앱`); 
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0047_Policies_Detect_Search_NetAppCategory_BasicCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('기본 카테고리').click();

  await page.getByRole('button', { name: '전체' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('검색포털');
  await page.getByRole('checkbox', { name: '검색포털' }).check();
  await page.locator('#netAppsServiceName').fill('Google');
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Google' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '검색포털' })).toBeVisible();
});

// 25/02/25) export가 너무 오래 걸리는 것 같다.
tcName = 'TC_WK_0048_Policies_Detect_Export_NetAppCategory_BasicCategory'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'netAppsMngList.sms');
  await page.getByText('기본 카테고리').click();

  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

//내보내기가 너무 오래걸리는 것 같음. (완료되는걸 못봄.)
tcName = 'TC_WK_0049_Policies_Detect_Create_UserDefinitionSite'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userDefinitionSiteSetList.sms');

  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="url"]').fill('userdef-site-creation.com');
  await page.getByRole('button', { name: '[선택]' }).click();
  await page.getByRole('searchbox', { name: 'Enter keywords' }).fill('포털_검색');
  await page.locator('span').filter({ hasText: '포털_검색' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '선택' }).click();
  await page.getByRole('row', { name: '(TC_WK_0049_Policies_Detect_Create_UserDefinitionSite) 자동화 사용자 정의 사이트용 정책 - 1' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '적용' }).click();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await expect(page.getByText('userdef-site-creation.com/')).toBeVisible();
});

tcName = 'TC_WK_0050_Policies_Detect_Modify_UserDefinitionSite'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userDefinitionSiteSetList.sms');

  await page.getByText('userdef-site-modification.com/').click();
//   await page.getByText('TC_WK_0050_Policies_Detect_Modify_UserDefinitionSite').fill('TC_WK_0050_Policies_Detect_Modify_UserDefinitiodnSite (수정완료)');
  await page.getByTitle('전체 삭제').click();
  await page.getByRole('button', { name: '선택' }).click();
  await page.getByRole('row', { name: '(TC_WK_0049_Policies_Detect_Create_UserDefinitionSite) 자동화 사용자 정의 사이트용 정책 - 2' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '적용' }).click();
  await page.getByRole('button', { name: '저장', exact: true }).click();
});

tcName = 'TC_WK_0051_Policies_Detect_Delete_UserDefinitionSite'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userDefinitionSiteSetList.sms');
  await page.getByText('userdef-site-deletion.com/').click();
  // await page.getByRole('button', { name: '삭제', exact: true }).click();
  await page.getByRole('button', { name: '강제 삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('userdef-site-deletion.com/')).not.toBeVisible();
});

tcName = 'TC_WK_0052_Policies_Detect_Search_UserDefinitionSite'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userDefinitionSiteSetList.sms');
  await page.getByRole('textbox').fill('userdef-site-search.com');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('userdef-site-search.com/')).toBeVisible();
});

tcName = 'TC_WK_0053_Policies_Detect_Create_MalwareExceptionHost'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyMalignantCodeList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.getByRole('textbox').fill('malware-creation.com');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('malware-creation.com/')).toBeVisible();
});

tcName = 'TC_WK_0054_Policies_Detect_Modify_MalwareExceptionHost'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyMalignantCodeList.sms');
  await page.getByText('malware-modification.com/').click();
  await page.getByRole('textbox').fill('malware-modification.com.complete');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('malware-modification.com.complete')).toBeVisible();
});

tcName = 'TC_WK_0055_Policies_Detect_Delete_MalwareExceptionHost'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyMalignantCodeList.sms');
  await page.getByRole('row', { name: 'malware-deletion.com' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('malware-deletion.com/')).not.toBeVisible();
});

tcName = 'TC_WK_0056_Policies_Detect_Search_MalwareExceptionHost'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyMalignantCodeList.sms');
  await page.getByRole('textbox').fill('malware-search.com');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('malware-search.com/')).toBeVisible();
});

tcName = 'TC_WK_0057_Policies_Detect_Create_InterceptionMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'interceptionMsgList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="msgname"]').fill('(TC_WK_0057_Policies_Detect_Create_InterceptionMessage) 자동화 생성용 차단 메시지');
  await page.getByText('사용자 아이디').click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('(TC_WK_0057_Policies_Detect_Create_InterceptionMessage) 자동화 생성용 차단 메시지')).toBeVisible();
});

tcName = 'TC_WK_0058_Policies_Detect_Modify_InterceptionMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'interceptionMsgList.sms');
  await page.getByText(`(TC_WK_0058_Policies_Detect_Modify_InterceptionMessage) 자동화 수정용 차단 메시지`).click();
  await page.locator('input[name="msgname"]').fill(`(TC_WK_0058_Policies_Detect_Modify_InterceptionMessage) 자동화 수정용 차단 메시지 (수정완료)`);
  await page.locator('pre').filter({ hasText: '사용자 아이디' }).locator('i').click();
  await page.getByText('사용자 IP').click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText(`(TC_WK_0058_Policies_Detect_Modify_InterceptionMessage) 자동화 수정용 차단 메시지 (수정완료)`)).toBeVisible();
});

tcName = 'TC_WK_0059_Policies_Detect_Delete_InterceptionMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'interceptionMsgList.sms');
  await page.getByText('(TC_WK_0059_Policies_Detect_Delete_InterceptionMessage) 자동화 삭제용 차단 메시지').click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('(TC_WK_0059_Policies_Detect_Delete_InterceptionMessage) 자동화 삭제용 차단 메시지')).not.toBeVisible();
});

tcName = 'TC_WK_0060_Policies_Detect_Create_TimeTable'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'timeScheduleList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('#timeName').fill('TC_WK_0060_Policies_Detect_Create_TimeTable');
  await page.locator('td:nth-child(3)').first().click();
  await page.locator('td:nth-child(4)').first().click();
  await page.locator('td:nth-child(5)').first().click();
  await page.locator('td:nth-child(6)').first().click();
  await page.locator('td:nth-child(7)').first().click();
  await page.locator('td:nth-child(8)').first().click();
  await page.locator('td:nth-child(9)').first().click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('TC_WK_0060_Policies_Detect_Create_TimeTable')).toBeVisible();
});

tcName = 'TC_WK_0061_Policies_Detect_Modify_TimeTable'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'timeScheduleList.sms');
  await page.getByText('TC_WK_0061_Policies_Detect_Modify_TimeTable').click();
  await page.locator('#timeName').fill('TC_WK_0061_Policies_Detect_Modify_TimeTable (수정완료)');
  await page.locator('td:nth-child(3)').first().click();
  await page.locator('td:nth-child(4)').first().click();
  await page.locator('td:nth-child(5)').first().click();
  await page.locator('td:nth-child(6)').first().click();
  await page.locator('td:nth-child(7)').first().click();
  await page.locator('td:nth-child(8)').first().click();
  await page.locator('td:nth-child(9)').first().click();
  await page.locator('td:nth-child(4)').first().click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('TC_WK_0061_Policies_Detect_Modify_TimeTable (수정완료)')).toBeVisible();
});

tcName = 'TC_WK_0062_Policies_Detect_Delete_TimeTable'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'timeScheduleList.sms');
  await page.getByText('TC_WK_0062_Policies_Detect_Delete_TimeTable').click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('TC_WK_0062_Policies_Detect_Delete_TimeTable')).not.toBeVisible();
});

tcName = 'TC_WK_0063_Policies_Detect_Search_TimeTable'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'timeScheduleList.sms');
  await page.locator('input[name="txtTimeName"]').fill('TC_WK_0063_Policies_Detect_Search_TimeTable');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('TC_WK_0063_Policies_Detect_Search_TimeTable')).toBeVisible();
});

tcName = 'TC_WK_0064_Policies_Detect_Create_NotificationMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'responseList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('#responseRuleName').fill('TC_WK_0064');
  await page.locator('#responseRuleDescription').fill('TC_WK_0064_Policies_Detect_Create_NotificationMessage');
  await page.locator('#responseType').selectOption('email');
  await page.getByRole('button', { name: '추가' }).click();
  await page.getByRole('row', { name: '보낸 사람(메일 주소)' }).getByRole('textbox').click();
  await page.getByRole('row', { name: '보낸 사람(메일 주소)' }).getByRole('textbox').fill('aqa@somansa.com');
  await page.getByRole('cell', { name: '자기 자신' }).getByRole('textbox').fill('aqa@somansa.com');
  await page.getByRole('row', { name: '제목' }).getByRole('textbox').fill('자동화 생성용 알림 메시지');
  await page.locator('#divMessage').getByText('사용자 아이디').click();
  await page.getByRole('button', { name: '저장' }).click();
});

//버그 있음: 이메일에서, 제목에 포커스를 둔 이후 내용에 포커스를 두더라도, 예약어를 추가하면 "내용" 텍스트 박스가 아닌 "제목" 텍스트 박스에 계속 들어가는현상.
tcName = 'TC_WK_0065_Policies_Detect_Modify_NotificationMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'responseList.sms');

  await page.getByText('TC_WK_0065', { exact: true }).click();
  await page.locator('#responseRuleName').fill('TC_WK_0065 (완)');
  await page.getByText('TC_WK_0065_Policies_Detect_Modify_NotificationMessage').fill('TC_WK_0065_Policies_Detect_Modify_NotificationMessage (수정완료)');

  //이메일
  await page.getByRole('row', { name: '보낸 사람(메일 주소) aqa@somansa.com' }).getByRole('textbox').fill('aqa_team@somansa.com');
  await page.getByRole('row', { name: '받는 사람(메일 주소) 자기 자신 aqa@somansa.com' }).getByRole('textbox').fill('aqa_team@somansa.com');
  await page.getByRole('cell', { name: '자동화 수정용 알림 메시지' }).getByRole('textbox').fill('자동화 수정용 알림 메시지 (수정완료)');
  await page.getByRole('cell', { name: '사용자 아이디 예약어 추가 이벤트 발생 시간 사용자 아이디 사용자 이름 카테고리 넷앱 이름 서비스 이름 정책 이름 경고 종류 발신자' }).locator('i').click();
  await page.getByRole('listitem').filter({ hasText: '이메일' }).getByText('사용자 이름').click();

  //에이전트
  await page.locator('#responseType').selectOption('agent');
  await page.getByRole('button', { name: '추가' }).click();
  await page.getByRole('table', { name: '에이전트 삭제' }).getByLabel(' 자기 자신 ').check();
  await page.getByRole('row', { name: '받는 사람(아이디) 자기 자신' }).getByRole('textbox').fill('notification_user');
  // await page.getByRole('listitem').filter({ hasText: '에이전트' }).getByText('이벤트 발생 시간').first().click();
  await page.getByRole('listitem').filter({ hasText: '에이전트' }).getByText('이벤트 발생 시간').click();

  //SMS
  await page.locator('#responseType').selectOption('sms');
  await page.getByRole('button', { name: '추가' }).click();
  await page.getByRole('row', { name: '보낸 사람(전화번호)' }).getByRole('textbox').click();
  await page.getByRole('row', { name: '보낸 사람(전화번호)' }).getByRole('textbox').fill('010-1234-5678');
  await page.getByRole('cell', { name: '자기 자신 여러 개일 경우 세미콜론(;)으로 구분하십시오' }).getByRole('textbox').click();
  await page.getByRole('row', { name: '받는 사람(전화번호) 자기 자신' }).getByRole('textbox').fill('010-9101-1121');
  await page.getByRole('listitem').filter({ hasText: ' SMS' }).getByText('사용자 아이디').click();
  await page.getByRole('listitem').filter({ hasText: ' SMS' }).getByText('사용자 이름').click();

  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0066_Policies_Detect_Delete_NotificationMessage'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'responseList.sms');

  await page.getByText('TC_WK_0066', { exact: true }).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('TC_WK_0066', { exact: true })).not.toBeVisible();
});