import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* DB 업데이트 */
// tcName = 'TC_WK_0085_DBUpdate_WebMalware_TotalUpdate';
// test(tcName, async ({ page, baseURL }) => {
//   await page.goto(baseURL + 'internetDBUpdate.sms');
//   await page.getByRole('button', { name: '업데이트 수행' }).click();
//   await page.getByRole('link', { name: '웹/악성코드 배포 사이트' }).click();
//   await page.getByRole('button', { name: '전체 업데이트' }).click();
//   await page.getByRole('button', { name: '확인' }).click();
//   //250218) 일단 업데이트 실패로. (db 넣어주는 스크립트가 필요할 듯.)
//   await page.waitForTimeout(1000)
//   await page.getByRole('button', { name: '확인' }).click();
// });

// tcName = 'TC_WK_0086_DBUpdate_WebMalware_IncrementalUpdate';
// test(tcName, async ({ page, baseURL }) => {
//   await page.goto(baseURL + 'internetDBUpdate.sms');
//   await page.getByRole('button', { name: '업데이트 수행' }).click();
//   await page.getByRole('link', { name: '웹/악성코드 배포 사이트' }).click();
//   await page.getByRole('button', { name: '증분 업데이트' }).click();
//   await page.getByRole('button', { name: '확인' }).click();
//   //250218) 일단 업데이트 실패로. (db 넣어주는 스크립트가 필요할 듯.)
//   await page.waitForTimeout(1000)
//   await page.getByRole('button', { name: '확인' }).click();
// });

// tcName = 'TC_WK_0087_DBUpdate_NetApp_TotalUpdate';
// test(tcName, async ({ page, baseURL }) => {
//   await page.goto(baseURL + 'internetDBUpdate.sms');
//   await page.getByRole('button', { name: '업데이트 수행' }).click();
//   await page.getByRole('link', { name: '넷앱' }).click();
//   await page.getByRole('button', { name: '전체 업데이트' }).click();
//   await page.getByRole('button', { name: '확인' }).click();
//   //250218) 일단 업데이트 실패로. (db 넣어주는 스크립트가 필요할 듯.)
//   await page.waitForTimeout(1000)
//   await page.getByRole('button', { name: '확인' }).click();
// });

tcName = 'TC_WK_0088_DBUpdate_NetApp_FileUploadUpdate';
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'internetDBUpdate.sms');
  await page.getByRole('button', { name: '업데이트 수행' }).click();
  await page.getByRole('link', { name: '넷앱' }).click(); //수동으로 클릭했을 때는 문제 없는데, 스크립트로 누르면 하단 파일 선택 부분이 투명해진다..
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '파일 선택' }).click();
  // await page.locator("#fileName").setInputFiles("D:\\text.txt")
  // await page.waitForTimeout(1000000)
});