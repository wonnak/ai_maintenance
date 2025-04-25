
import { test, expect } from '@playwright/test';
test('적용대상테스트', async ({ page }) => {
    await page.goto('https://auto-mail-i-update-new.somansa.com/DLPCenter/loginform.sms');
    await page.locator('#uid').fill('somansa');
    await page.locator('#upw').click();
    await page.locator('#upw').fill('Aqarhksfl1!');
    await page.getByRole('button', { name: '로그인' }).click();
    
    await page.locator('#btnTreeSearch').click();await page.goto('https://auto-mail-i-update-new.somansa.com/DLPCenter/policyNetworkList.sms');
    await page.getByRole('button', { name: '신규 추가' }).click();
    await page.getByRole('button', { name: '선택', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.locator('#txtTreeSearch').fill('test02');
});

