//import { test, expect } from '@playwright/test';
import { expect } from '@playwright/test';
import { test } from '../fixtures';

/*
test('TC_0001_login_naverWebSite', async ({ page }) => {
  await page.goto('https://nid.naver.com');
});
*/
test('TC_0002_login_naverWebSite', async ({ page }) => {
  await page.goto('https://nid.naver.com');
  await expect(page.getByRole('combobox', { name: '테스트테테테' })).toBeVisible();
});


