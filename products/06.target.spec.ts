import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* 대상 > 사용자 */
tcName = 'TC_WK_0075_Target_Create_User'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userList.sms');
  await page.getByRole('button', { name: '사용자 추가' }).click();
  await page.getByRole('row', { name: '사용자 아이디 필수  ' }).getByRole('textbox').fill('create_user');
  await page.getByRole('row', { name: '사용자 아이디 필수  ' }).getByRole('textbox').press('Enter');
  await page.locator('input[name="userName"]').fill('자동화 생성용 사용자');
  await page.getByRole('button', { name: '비밀번호 인증 사용' }).click();
  await page.locator('input[name="passwd"]').fill('Aqarhksfl1!');
  await page.locator('input[name="passwd"]').press('Enter')
  await page.locator('input[name="passwdConfirm"]').fill('Aqarhksfl1!');
  await page.locator('input[name="passwdConfirm"]').press('Enter')
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('자동화 생성용 사용자', { exact: true })).toBeVisible();
});

tcName = 'TC_WK_0076_Target_Modify_User'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userList.sms');
  await page.getByText('자동화 수정용 사용자', { exact: true }).click();
  await page.locator('input[name="userName"]').fill('자동화 수정용 사용자 수정완료');
  await page.locator('input[name="employeeNo"]').fill('2222');
  await page.locator('input[name="position"]').fill('책임연구원');
  await page.locator('input[name="company"]').fill('사만소');
  await page.locator('input[name="email"]').fill('modify_user_complete@samanso.net');
  await page.locator('input[name="phone"]').fill('01022222222');
  await page.getByRole('checkbox', { name: '팀장 또는 관리자' }).uncheck();
  await page.getByRole('checkbox', { name: '개인 정보 관리 담당자(부서)' }).check();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('자동화 수정용 사용자 수정완료', { exact: true })).toBeVisible();
});

tcName = 'TC_WK_0077_Target_Delete_User'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userList.sms');
  await page.getByRole('row', { name: '회사 자동화 삭제용 사용자 사용자 정보 분석' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '사용자 비활성화' }).click();
  await page.waitForTimeout(3000)
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('#divReason').getByRole('combobox').selectOption('7da7a605-ca67-4ac8-a5d2-3acc33bec18c');
  await page.getByRole('button', { name: '확인' }).click();

  //검색하여 활성 사용자 리스트에 존재하지 않음을 확인
  await page.getByRole('listitem').filter({ hasText: ' 사용자 아이디 ' }).getByRole('textbox').fill('delete_user');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '데이터가 존재하지 않습니다' })).toBeVisible();
});

tcName = 'TC_WK_0078_Target_Search_User'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userList.sms');
  await page.getByRole('listitem').filter({ hasText: ' 사용자 아이디 ' }).getByRole('textbox').fill('search_user');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('자동화 검색용 사용자', { exact: true })).toBeVisible();
});

tcName = 'TC_WK_0079_Target_Export_User'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'userList.sms');
  await page.getByRole('listitem').filter({ hasText: ' 사용자 아이디 ' }).getByRole('textbox').fill('export_user');
  await page.getByRole('button', { name: '검색' }).click();

  //내보내기
  await page.locator('#topBtnExcelExport').hover();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

/* 대상 > IP */
tcName = 'TC_WK_0080_Target_Create_IP';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'httpSDIPList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="userName"]').fill(`(TC_WK_0080_Target_Create_IP) 자동화 생성용 IP`);
  await page.getByRole('cell', { name: '~', exact: true }).locator('input[name="httpSDIPData\\.startIP"]').fill('0.0.0.0');
  // await page.getByRole('cell', { name: '0.0.0.0 ~ 0.0.0.0', exact: true }).locator('input[name="httpSDIPData\\.endIP"]').fill('0.0.0.0');
  await page.getByRole('checkbox', { name: '모든 포트' }).check();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('cell', { name: `(TC_WK_0080_Target_Create_IP) 자동화 생성용 IP`, exact: true })).toBeVisible();
});

tcName = 'TC_WK_0081_Target_Modify_IP';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'httpSDIPList.sms');
  await page.getByRole('cell', { name: `(TC_WK_0081_Target_Modify_IP) 자동화 수정용 IP` }).locator('a').click();
  await page.locator('input[name="userName"]').fill(`(TC_WK_0081_Target_Modify_IP) 자동화 수정용 IP (수정완료)`);
  await page.getByRole('cell', { name: '0.0.0.0 ~ 0.0.0.0', exact: true }).locator('input[name="httpSDIPData\\.startIP"]').fill('1.0.0.0');
  await page.getByRole('cell', { name: '1.0.0.0 ~ 0.0.0.0', exact: true }).locator('input[name="httpSDIPData\\.endIP"]').click();
  await page.getByRole('cell', { name: '1.0.0.0 ~ 0.0.0.0 시작 IP가 끝 IP보다 큽니다. IP 범위를 정확히 입력해 주십시오.', exact: true }).locator('input[name="httpSDIPData\\.endIP"]').fill('2.0.0.0');
  await page.getByRole('checkbox', { name: '모든 포트' }).uncheck();
  await page.getByRole('cell', { name: '1 ~ 65535 모든 포트', exact: true }).locator('input[name="httpSDIPData\\.startPort"]').fill('10');
  await page.getByRole('cell', { name: '10 ~ 65535 모든 포트', exact: true }).locator('input[name="httpSDIPData\\.endPort"]').fill('1000');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('cell', { name: `(TC_WK_0081_Target_Modify_IP) 자동화 수정용 IP (수정완료)`, exact: true })).toBeVisible();
});

tcName = 'TC_WK_0082_Target_Delete_IP';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'httpSDIPList.sms');
  await page.getByRole('cell', { name: `(TC_WK_0082_Target_Delete_IP) 자동화 삭제용 IP` }).locator('a').click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();

  //삭제 항목 없는 것 확인
  await page.locator('input[name="txtUserName"]').fill(`(TC_WK_0082_Target_Delete_IP) 자동화 삭제용 IP`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '데이터가 존재하지 않습니다' })).toBeVisible();
});

tcName = 'TC_WK_0083_Target_Search_IP';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'httpSDIPList.sms');
  await page.locator('input[name="txtUserName"]').fill(`(TC_WK_0083_Target_Search_IP) 자동화 검색용 IP`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '(TC_WK_0083_Target_Search_IP) 자동화 검색용 IP', exact: true })).toBeVisible();
});

tcName = 'TC_WK_0084_Target_Export_IP';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'httpSDIPList.sms');
  await page.locator('input[name="txtUserName"]').fill(`(TC_WK_0084_Target_Export_IP) 자동화 내보내기용 IP`);
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});