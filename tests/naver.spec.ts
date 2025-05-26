//import { test, expect } from '@playwright/test';
import { test } from '../fixtures';

test('TC_0001_login_naverWebSite', async ({ page }) => {
  await page.goto('https://nid.naver.com');
});

/*
test('TC_0001_login_naverWebSite2', async ({ page }) => {
  await page.goto('https://nid.naver.com');
  await page.getByRole('combobox', { name: '테스트테테테' }).selectOption('ko_KR');
});
*/

