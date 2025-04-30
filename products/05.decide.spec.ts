import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* 결재 */
tcName = 'TC_WK_0067_Decide_Research';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
    2. 검색 후 기대 값
  */
  await page.goto(baseURL + 'decideNetworkUserAdminPage.sms');

  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
});

tcName = 'TC_WK_0068_Decide_Export';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
  */
  await page.goto(baseURL + 'decideNetworkUserAdminPage.sms');

  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('#startDate').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('#endDate').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();

  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
  await page.getByRole('radio', { name: '현재 페이지' }).check();
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0069_Decide_CreateAndCancel_ApprovalDelegation';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'decideDelegate.sms');
  //'자동화 생성용 및 취소용 위임' 추가
  await page.getByRole('button', { name: '추가' }).click();
  await page.getByRole('row', { name: '결재권자 선택' }).getByRole('button').click();
  await page.locator('#txtTreeSearch').fill('자동화 결재용 사용자 1');
  await page.getByRole('img', { name: '검색' }).click();
  await page.locator('#treeSearchList').getByText('자동화 결재용 사용자 1(decide_user_1)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByRole('row', { name: '위임자 선택' }).getByRole('button').click();
  await page.locator('#txtTreeSearch').click();
  await page.locator('#txtTreeSearch').fill('자동화 결재용 사용자 2');
  await page.getByRole('img', { name: '검색' }).click();
  await page.locator('#treeSearchList').getByText('자동화 결재용 사용자 2(decide_user_2)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('#delegateStartHour').selectOption('23');
  await page.locator('#delegateStartMinute').selectOption('55');
  await page.locator('input[name="decideDelegateCommand\\.delegateComment"]').fill('(TC_WK_0069_Decide_CreateAndCancel_ApprovalDelegation)자동화생성용및취소용위임');
  await page.waitForTimeout(500) //아래 라인을 클릭한 이후에 저장버튼을 가리는 레이블이 생겨서 해당 시간 delay후 클릭하도록.
  await page.getByRole('cell', { name: '위임 사유' }).click(); //저장버튼을 가려서 임의의 한 곳 클릭
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('(TC_WK_0069_Decide_CreateAndCancel_ApprovalDelegation)자동화생성용및취소용위임')).toBeVisible();

  //'자동화 생성용 및 취소용 위임' 취소
  await page.getByRole('button', { name: '취소' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0070_Decide_Search_ApprovalDelegation';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'decideDelegate.sms');
  //'자동화 생성용 및 취소용 위임' 추가
  await page.locator('#delegateComment').fill('자동화 검색용 위임');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('(TC_WK_0070_Decide_Search_ApprovalDelegation)자동화검색용위임')).toBeVisible();
});

//"적용 대상"의 "선택" 버튼이 안눌리는 경우가 있네(창이 내려가 있거나 비활성화되면 그러는 것 같음.)
tcName = 'TC_WK_0071_Decide_Create_Decide';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyDecideAList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('[id="decidePolicy\\.policyName"]').fill('(TC_WK_0071_Decide_Create_Decide) 자동화 생성용 결재선');
  await page.getByRole('button', { name: '선택' }).click();
  await page.waitForTimeout(1000)
  //await page.locator('#treeMenu1 #txtTreeSearch').fill('자동화 결재용 사용자 1');
  await page.locator('#treeMenuUser #txtTreeSearch').fill('자동화 결재용 사용자 1');

  await page.locator('#treeMenuUser').getByRole('img', { name: '검색' }).click();
  await page.locator('#treeMenuUser #treeSearchList').getByText('자동화 결재용 사용자 1(decide_user_1)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByRole('checkbox', { name: '사용' }).check();
  await page.getByText(' 네트워크 승인권자 설정').click(); //저장버튼을 가려서 임의의 한 곳 클릭
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '결재선 적용' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0072_Decide_Modify_Decide';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyDecideAList.sms');
  await page.getByText('(TC_WK_0072_Decide_Modify_Decide) 자동화 수정용 결재선', { exact: true }).click();
  await page.locator('[id="decidePolicy\\.policyName"]').fill('(TC_WK_0072_Decide_Modify_Decide) 자동화 수정용 결재선 (수정완료)');
  await page.getByRole('button', { name: '선택' }).click();
  await page.waitForTimeout(1000)
  await page.locator('#treeMenuUser #txtTreeSearch').fill('자동화 결재용 사용자 2');
  await page.locator('#treeMenuUser').getByRole('img', { name: '검색' }).click();
  await page.locator('#treeMenuUser #treeSearchList').getByText('자동화 결재용 사용자 2(decide_user_2)').click();
  await page.getByRole('row', { name: '사용자 자동화 결재용 사용자 2(decide_user_2) NEW 회사 설정' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: '사용자 자동화 결재용 사용자 1(' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '선택 삭제' }).click();
  await page.locator('#divConfirm').getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByRole('cell', { name: '부서 내 팀장 또는 관리자 소속 부서의 팀장 삭제', exact: true }).locator('select[name="limitedUnderDecideOfficerType"]').selectOption('4');
  await page.getByRole('button', { name: '추가' }).click();
  await page.getByRole('cell', { name: '부서 내 팀장 또는 관리자 소속 부서의 팀장 삭제', exact: true }).locator('select[name="limitedUnderDecideOfficerType"]').selectOption('16');
  await page.getByRole('cell', { name: '고정 승인권자 0명 선택 선택 삭제', exact: true }).getByRole('button').click();
  await page.waitForTimeout(1000)
  await page.locator('#treeMenu #txtTreeSearch').click();
  await page.locator('#treeMenu #txtTreeSearch').fill('자동화 결재용 사용자 1');
  await page.getByRole('img', { name: '검색' }).click();
  await page.locator('#treeMenu #treeSearchList').getByText('자동화 결재용 사용자 1(decide_user_1)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByRole('checkbox', { name: '사용' }).uncheck();
  await page.getByText(' 네트워크 승인권자 설정').click(); //저장버튼을 가리는 레이블 없애기 위함.
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0073_Decide_Delete_Decide';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyDecideAList.sms');
  await page.getByText('(TC_WK_0073_Decide_Delete_Decide) 자동화 삭제용 결재선', { exact: true }).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0074_Decide_Search_Decide';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyDecideAList.sms');
  await page.locator('input[name="policyName"]').fill('(TC_WK_0074_Decide_Search_Decide) 자동화 검색용 결재선');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('(TC_WK_0074_Decide_Search_Decide) 자동화 검색용 결재선')).toBeVisible();
});
