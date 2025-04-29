import { expect } from '@playwright/test';
import { test } from '../fixtures';
let tcName: string = '';

test.use({ storageState: 'auth.json' });

test.beforeEach(async ({ page, baseURL }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
  // await page.goto(baseURL + 'loginform.sms');
  // await page.locator('#uid').fill('somansa');
  // await page.locator('#upw').fill('Sms980502!');
  // await page.getByRole('button', { name: '로그인' }).click();
});

/* 정책 */
tcName = 'TC_InputType_Check'
test(tcName, async ({ page, baseURL }) => {
  
  await page.goto(baseURL + 'policyDiscoverAServersList.sms');
  
  // await page.getByRole('button', { name: '신규 추가' }).click();
  // await page.getByRole('button', { name: '선택', exact: true }).click();
  // await page.locator('#txtTreeSearch').click();
  // await page.locator('#txtTreeSearch').fill('auto-sv-i-agent-1');
  // await page.locator('#btnTreeSearch').click();
  // await expect(page.locator('#treeSearchList').getByText('auto-sv-i-agent-1(10.216.193.')).toBeVisible();

});

