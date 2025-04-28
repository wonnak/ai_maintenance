//import { test, expect } from '@playwright/test';
import { test } from '../fixtures';

test('TC_0003_random_fail', async ({ page }) => {
  await page.goto('https://nid.naver.com');
  //await page.waitForTimeout(5000)
  // await page.locator('#locale_switch_0003').click();
  // await page.locator('#locale_switch').selectOption('ko_KR');
  // await page.getByRole('textbox', { name: '아이디 또는 전화번호' }).fill('kimilsuk1310');
  // await page.getByRole('textbox', { name: '비밀번호' }).fill('Dlftjr*520');
  // await page.getByRole('button', { name: '로그인', exact: true }).click();
  // // await page.waitForTimeout(100000);
  // await page.waitForTimeout(3000);
});


test('TC_0004_random_fail', async ({ page }) => {
  await page.goto('https://nid.naver.com');
  //await page.waitForTimeout(5000)
  await page.locator('#locale_switch_0004').click();
  await page.locator('#locale_switch').selectOption('ko_KR');
  await page.getByRole('textbox', { name: '아이디 또는 전화번호' }).fill('kimilsuk1310');
  await page.getByRole('textbox', { name: '비밀번호' }).fill('Dlftjr*520');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  // await page.waitForTimeout(100000);
  await page.waitForTimeout(3000);
});