import { expect } from '@playwright/test';
import { test } from '../fixtures';
import * as fs from 'fs';
let tcName: string = '';

test.beforeEach(async ({ page, baseURL }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });

  // await page.goto(baseURL + 'loginform.sms');
  // await page.getByRole('img').nth(3).click();
  // await page.locator('#uid').fill('somansa');
  // await page.locator('#uid').press('Tab');
  // await page.locator('#upw').fill('Sms980502!');
  // await page.getByRole('button', { name: '로그인' }).click();

});

tcName = 'TC_WK_0089_Manage_Admins_Create_Admin';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'adminList.sms');
  await page.getByRole('button', { name: '관리자 추가' }).click();
  await page.locator('input[name="userName"]').fill('create_admin');
  await page.locator('input[name="userNameStr"]').fill('자동화 생성용 관리자');
  await page.locator('input[name="userPassword"]').fill('Aqarhksfl1!');
  await page.locator('input[name="userPassword"]').press('Enter');
  await page.locator('input[name="userPasswordConfirm"]').fill('Aqarhksfl1!');
  await page.locator('input[name="userPasswordConfirm"]').press('Enter');
  await page.locator('select[name="userLevel"]').selectOption('0');
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0090_Manage_Admins_Modify_Admin';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'adminList.sms');
  await page.getByText('modify_admin', { exact: true }).click();

  await page.locator('input[name="userNameStr"]').fill('자동화 수정용 관리자 (수정완료)');

  await page.getByRole('button', { name: '비밀번호 변경' }).click();
  await page.locator('input[name="userPassword"]').fill('Aqarhksfl980502!!');
  await page.locator('input[name="userPassword"]').press('Enter');
  await page.locator('input[name="userPasswordConfirm"]').fill('Aqarhksfl980502!!');
  await page.locator('input[name="userPasswordConfirm"]').press('Enter');

  await page.getByRole('button', { name: '선택' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('link', { name: '부서 미지정' }).click();
  await page.getByRole('row', { name: '부서 회사 삭제' }).locator('i').nth(1).click();
  await page.getByRole('button', { name: '확인' }).click();

  await page.locator('select[name="userLevel"]').selectOption('1');
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0091_Manage_Admins_Delete_Admin';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'adminList.sms');
  await page.getByText('delete_admin', { exact: true }).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0092_Manage_Admins_Search_Admin';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'adminList.sms');
  await page.locator('input[name="filterUserName"]').fill('search_admin');
  await page.locator('input[name="filterUserNameStr"]').fill('자동화 검색용 관리자');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('search_admin', { exact: true })).toBeVisible();
});

tcName = 'TC_WK_0093_Manage_Admins_Export_Admin';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'adminList.sms');
  await page.locator('input[name="filterUserName"]').fill('export_admin');
  await page.locator('input[name="filterUserNameStr"]').fill('자동화 내보내기용 관리자');
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0094_Manage_AuditLog_Search_Log';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
    2. 검색 후 기대 값
  */
  await page.goto(baseURL + 'userAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
});

tcName = 'TC_WK_0095_Manage_AuditLog_Export_Log';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
  */
  await page.goto(baseURL + 'userAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.locator('#quickBtnArea').getByText('엑셀 내보내기').click();
});

tcName = 'TC_WK_0096_Manage_AlertsNotifications_Reports_Create_Report';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticePolicyList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="noticeName"]').fill(`TC_WK_0096_Manage_AlertsNotifications_Reports_Create_Report`);
  await page.getByRole('listitem', { name: '적용 사용자' }).click();
  await page.waitForTimeout(500)
  await page.locator('#divDeptTree #txtTreeSearch').fill('자동화 관리용 사용자 1');
  await page.locator('#divDeptTree #btnTreeSearch').click();
  await page.locator('#divDeptTree #treeSearchList').getByText('자동화 관리용 사용자 1(manage_user_1)').click();
  await page.getByRole('button', { name: '확인' }).click();

  await page.getByRole('checkbox', { name: '각 부서의 팀장 또는 관리자(대상은 해당 부서로 한정)' }).check();
  await page.locator('input[name="reportContents\\.mailSubject"]').fill('자동화 생성용 주기적 리포트');
  await page.locator('textarea[name="reportContents\\.mailBody"]').fill('자동화 생성용 주기적 리포트');
  await page.locator('select[name="schedule\\.startTime\\.hour"]').selectOption('23');
  await page.locator('select[name="schedule\\.startTime\\.min"]').selectOption('59');
  await page.waitForTimeout(500)
  await page.getByText(' 주기 설정').click(); //저장버튼을 가리는 레이블 없애기 위함.
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0097_Manage_AlertsNotifications_Reports_Modify_Report';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticePolicyList.sms');
  await page.getByText(`TC_WK_0097_Manage_AlertsNotifications_Reports_Modify_Report`, { exact: true }).click();
  await page.locator('input[name="noticeName"]').fill('TC_WK_0097_Manage_AlertsNotifications_Reports_Modify_Report 수정완료');
  await page.getByRole('listitem', { name: '적용 사용자' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('cell', { name: '삭제' }).locator('i').click();
  await page.locator('#divDeptTree #txtTreeSearch').fill('자동화 관리용 사용자 2');
  await page.locator('#divDeptTree #btnTreeSearch').click();
  await page.locator('#divDeptTree #treeSearchList').getByText('자동화 관리용 사용자 2(manage_user_2)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByRole('checkbox', { name: '각 부서의 팀장 또는 관리자(대상은 해당 부서로 한정)' }).uncheck();
  await page.getByRole('checkbox', { name: '각 부서의 개인정보 관리 담당자(대상은 해당 부서로 한정)' }).check();
  await page.locator('input[name="reportContents\\.mailSubject"]').fill('자동화 수정용 주기적 리포트 (수정완료)');
  // await page.getByText('자동화 수정용 주기적 리포트', { exact: true }).fill('자동화 수정용 주기적 리포트 (수정완료)');
  await page.locator('textarea[name="reportContents\\.mailBody"]').fill('자동화 수정용 주기적 리포트 (수정완료)');

  await page.locator('select[name="scheduleList\\[0\\]\\.cycleType"]').selectOption('2');
  await page.getByText('알림 설정').click(); //저장버튼을 가려서 임의의 요소 클릭
  await page.getByText('알림 설정').click(); //저장버튼을 가려서 임의의 요소 클릭
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('TC_WK_0097_Manage_AlertsNotifications_Reports_Modify_Report 수정완료', { exact: true })).toBeVisible();
});

tcName = 'TC_WK_0098_Manage_AlertsNotifications_Reports_Delete_Report';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticePolicyList.sms');
  await page.getByText(`TC_WK_0098_Manage_AlertsNotifications_Reports_Delete_Report`).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0099_Manage_AlertsNotifications_Reports_Search_Report';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticePolicyList.sms');
  await page.getByRole('textbox').fill(`TC_WK_0099_Manage_AlertsNotifications_Reports_Search_Report`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText('TC_WK_0099_Manage_AlertsNotifications_Reports_Search_Report')).toBeVisible();
});

tcName = 'TC_WK_0100_Manage_AlertsNoti_PeriodicLog_Create_Incident';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticeIncidentsList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="noticeName"]').fill(`TC_WK_0100_Manage_AlertsNoti_PeriodicLog_Create_Incident`)
  await page.getByRole('listitem', { name: '적용 사용자' }).click();
  await page.waitForTimeout(500)
  await page.locator('#divDeptTree #txtTreeSearch').fill('자동화 관리용 사용자 1');
  await page.locator('#divDeptTree #btnTreeSearch').click();
  await page.locator('#divDeptTree #treeSearchList').getByText('자동화 관리용 사용자 1(manage_user_1)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('#insertButtonAll').click();
  await page.getByRole('checkbox', { name: '각 부서의 팀장 또는 관리자(대상은 해당 부서로 한정)' }).check();
  await page.locator('input[name="reportContents\\.mailSubject"]').fill('자동화 생성용 주기적 로그');
  await page.locator('textarea[name="reportContents\\.mailBody"]').fill('자동화 생성용 주기적 로그');
  await page.locator('select[name="schedule\\.startTime\\.hour"]').selectOption('23');
  await page.locator('select[name="schedule\\.startTime\\.min"]').selectOption('59');
  await page.getByText(' 주기 설정').click(); //저정버튼을 가리는 패널이 생겨서 아무곳이나 클릭.
  await page.getByRole('button', { name: '저장', exact: true }).click();
});

tcName = 'TC_WK_0101_Manage_AlertsNoti_PeriodicLog_Modify_Incident';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticeIncidentsList.sms');
  await page.getByText(`TC_WK_0101_Manage_AlertsNoti_PeriodicLog_Modify_Incident`).click();
  await page.locator('input[name="noticeName"]').fill('TC_WK_0101_Manage_AlertsNoti_PeriodicLog_Modify_Incident (수정완료)');
  await page.getByRole('listitem', { name: '적용 사용자' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('cell', { name: '삭제' }).locator('i').click();
  await page.locator('#divDeptTree #txtTreeSearch').fill('자동화 관리용 사용자 2');
  await page.locator('#divDeptTree #btnTreeSearch').click();
  await page.locator('#divDeptTree #treeSearchList').getByText('자동화 관리용 사용자 2(manage_user_2)').click();
  await page.getByRole('button', { name: '확인' }).click();
  //컬럼설정
  await page.locator('#deleteButtonAll').click();
  await page.getByRole('checkbox', { name: '발생 일시' }).check();
  await page.locator('#insertButton').click();
  await page.getByRole('checkbox', { name: '각 부서의 팀장 또는 관리자(대상은 해당 부서로 한정)' }).uncheck();
  await page.getByRole('checkbox', { name: '사용자 지정' }).check();
  await page.locator('#recipientEmpLabel').click();
  await page.waitForTimeout(500)
  await page.locator('#divDeptTree #txtTreeSearch').fill('자동화 관리용 사용자 2');
  await page.locator('#divDeptTree #btnTreeSearch').click();
  await page.locator('#divDeptTree #treeSearchList').getByText('자동화 관리용 사용자 2(manage_user_2)').click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('input[name="reportContents\\.mailSubject"]').fill('자동화 수정용 주기적 로그 (수정완료)');
  // await page.getByText('자동화 수정용 주기적 로그').fill('자동화 수정용 주기적 로그 (수정완료)');
  await page.locator('textarea[name="reportContents\\.mailBody"]').fill('자동화 수정용 주기적 로그 (수정완료)');
  await page.locator('select[name="scheduleList\\[0\\]\\.cycleType"]').selectOption('2');
  await page.waitForTimeout(500)
  await page.getByText(' 알림 설정').click(); //저장버튼을 가리는 레이블을 없애기 위함.
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('cell', { name: 'TC_WK_0101_Manage_AlertsNoti_PeriodicLog_Modify_Incident (수정완료)', exact: true })).toBeVisible();
});

tcName = 'TC_WK_0102_Manage_AlertsNoti_PeriodicLog_Delete_Incident';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticeIncidentsList.sms');
  await page.getByText(`TC_WK_0102_Manage_AlertsNoti_PeriodicLog_Delete_Incident`).click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0103_Manage_AlertsNoti_PeriodicLog_Search_Incident';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'noticeIncidentsList.sms');
  await page.getByRole('textbox').fill(`TC_WK_0103_Manage_AlertsNoti_PeriodicLog_Search_Incident`);
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByText(`TC_WK_0103_Manage_AlertsNoti_PeriodicLog_Search_Incident`)).toBeVisible();
});

tcName = 'TC_WK_0104_Manage_System_Endpoint_Search_Endpoint';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
    2. 검색 후 기대 값
  */
  await page.goto(baseURL + 'endpointAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
});

tcName = 'TC_WK_0105_Manage_System_Endpoint_Export_Endpoint';
test(tcName, async ({ page, baseURL }) => {
  /* 
    [개선요망]
    1. 유효 데이터 날짜로 변경
  */
  await page.goto(baseURL + 'endpointAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.getByRole('listitem').filter({ hasText: ' 엑셀 내보내기 ' }).locator('span').click();
});

tcName = 'TC_WK_0106_Manage_System_Batch_Search_Module';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'enginAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
});

tcName = 'TC_WK_0107_Manage_System_Batch_Export_Module';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'enginAudittrail.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.getByRole('listitem').filter({ hasText: ' 엑셀 내보내기 ' }).locator('span').click();
});

tcName = 'TC_WK_0108_Manage_System_SystemAlert_Search_Alert';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'systemAlertList.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
});

tcName = 'TC_WK_0109_Manage_System_SystemAlert_Export_Alert';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'systemAlertList.sms');
  await page.getByRole('button', { name: '직접 지정' }).click();
  await page.locator('input[name="tb_start_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('input[name="tb_end_dt"]').click();
  await page.getByLabel('Select month').selectOption('0');
  await page.getByRole('link', { name: '31', exact: true }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await page.locator('#topBtnExcelExport').click();
  await page.getByRole('listitem').filter({ hasText: ' 엑셀 내보내기 ' }).locator('span').click();
});

tcName = 'TC_WK_0110_Manage_Settings_General_Modify_Settings';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'general.sms');
  await page.locator('#txtdataTableLimitCnt').click();
  await page.locator('#txtdataTableLimitCnt').selectOption('100');
  await page.locator('#txtpwdLimitCnt').click();
  await page.locator('#txtpwdLimitCnt').fill('10');
  await page.locator('#txtpwdWaitTime').click();
  await page.locator('#txtpwdWaitTime').fill('2');
  await page.locator('select[name="txtusePreviousPwdCheckAdmin"]').click();
  await page.locator('select[name="txtusePreviousPwdCheckAdmin"]').selectOption('1');
  await page.locator('#txtpwdLength').click();
  await page.locator('#txtpwdLength').fill('10');
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0111_Manage_Settings_IncidentsStatus_Create_Status';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'statusList.sms');
  await page.getByRole('button', { name: '신규 추가' }).click();
  await page.locator('input[name="statusName"]').fill(`(TC_WK_0111_Manage_Settings_IncidentsStatus_Create_Status) 자동화 생성용 로그 상태`);
  await page.getByRole('row', { name: '메일 발송 기능  로그에서 상태 변경 시 담당자에게 메일 발송을 할 수 있습니다. 사용' }).getByLabel(' 사용 ').check();
  await page.getByRole('row', { name: '책임자만 지정 가능 사용' }).getByLabel(' 사용 ').check();
  await page.getByRole('button', { name: '저장' }).click();
});

tcName = 'TC_WK_0112_Manage_Settings_IncidentsStatus_Modify_Status';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'statusList.sms');
  await page.getByRole('cell', { name: '(TC_WK_0112_Manage_Settings_IncidentsStatus_Modify_Status) 자동화 수정용 로그 상태' }).locator('a').click();
  await page.locator('input[name="statusName"]').click();
  await page.locator('input[name="statusName"]').press('End');
  await page.locator('input[name="statusName"]').fill('(TC_WK_0112_Manage_Settings_IncidentsStatus_Modify_Status) 자동화 수정용 로그 상태 (수정완료)');
  await page.getByRole('row', { name: '메일 발송 기능  로그에서 상태 변경 시 담당자에게 메일 발송을 할 수 있습니다. 사용' }).getByLabel(' 사용 ').uncheck();
  await page.getByRole('row', { name: '책임자만 지정 가능 사용' }).getByLabel(' 사용 ').uncheck();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('cell', { name: '(TC_WK_0112_Manage_Settings_IncidentsStatus_Modify_Status) 자동화 수정용 로그 상태 (수정완료)' }).locator('a')).toBeVisible();
});

tcName = 'TC_WK_0113_Manage_Settings_IncidentsStatus_Delete_Status';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'statusList.sms');
  await page.getByRole('cell', { name: '(TC_WK_0113_Manage_Settings_IncidentsStatus_Delete_Status) 자동화 삭제용 로그 상태' }).locator('a').click();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0114_Manage_Settings_BackupRecover_PolicyBackup_Create_Backup';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyBackup.sms');

  //정책백업 선택
  await page.locator('select[name="backupType"]').selectOption('P');

  //백업실행
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('PolicyBackup');
  await page.getByRole('button', { name: '백업 실행' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();

  //복원실행
  await page.getByRole('button', { name: '복원 실행' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();

  //백업 다운로드
  await page.getByRole('button', { name: '다운로드' }).click();
  await page.getByRole('button', { name: '확인' }).click();

  // //백업삭제
  // await page.locator('input[name="backup_dateList"]').check();
  // await page.getByRole('button', { name: '백업 삭제' }).click();
  // await page.getByRole('button', { name: '확인' }).click();
  // await page.waitForTimeout(500)
  // await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0115_Manage_Settings_BackupRecover_PolicyBackup_Delete_Backup';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyBackup.sms');

  //정책백업 선택
  await page.locator('select[name="backupType"]').selectOption('P');

  //정책백업 삭제
  await page.locator('tr', { hasText: '자동화 삭제용 정책 백업' }).locator('input[type="checkbox"]').check();

  await page.getByRole('button', { name: '백업 삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();

});

tcName = 'TC_WK_0116_Manage_Settings_BackupRecover_DBBackup_Create_Backup';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyBackup.sms');

  //DB백업 선택
  await page.locator('select[name="backupType"]').selectOption('D');

  //DB백업 실행
  await page.getByRole('cell', { name: '백업 실행' }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '백업 실행' }).getByRole('textbox').fill('DBBackup');
  await page.getByRole('button', { name: '백업 실행' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();

  //백업 다운로드
  await page.getByRole('button', { name: '다운로드' }).click();
  await page.getByRole('button', { name: '확인' }).click();
});

tcName = 'TC_WK_0117_Manage_Settings_BackupRecover_DBBackup_Delete_Backup';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'policyBackup.sms');

  //DB백업 선택
  await page.locator('select[name="backupType"]').selectOption('D');
  
  //DB백업 삭제
  await page.locator('tr', { hasText: '자동화 삭제용 DB 백업' }).locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: '백업 삭제' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '확인' }).click();
});
