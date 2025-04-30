import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('TC_0002_login_daumWebSite', async ({ page }) => {

  await page.goto('https://accounts.kakao.com');

  await page.getByRole('combobox', { name: 'Language Selection Box' }).click();
  await page.getByRole('option', { name: '한국어' }).click();
  await page.getByRole('textbox', { name: '계정정보 입력' }).fill('kimilsuk1310@hanmail.net');
  await page.getByRole('textbox', { name: '비밀번호 입력' }).fill('dlftjr*520');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await expect(page.getByRole('link', { name: '카카오계정' })).toBeVisible();
});