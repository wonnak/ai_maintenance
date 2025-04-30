//import { test, expect } from '@playwright/test';
import { test } from '../fixtures';

test('TC_0001_login_naverWebSite', async ({ page }) => {
  await page.goto('https://nid.naver.com');
  await page.getByRole('combobox', { name: '언어선택' }).selectOption('ko_KR');
  await page.getByRole('textbox', { name: '아이디 또는 전화번호' }).fill('kimilsuk1310');
  await page.getByRole('textbox', { name: '비밀번호' }).fill('Dlftjr*520');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
});