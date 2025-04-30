import { expect } from '@playwright/test';
import { test } from '../fixtures';

let tcName: string = '';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
});

/* 대시보드 */
tcName = 'TC_WK_0000_Dashboard_Check_ComponentArrangement'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'dashboardInternet.sms');

  await page.waitForTimeout(5000)
  const confirmButton = await page.getByRole('button', { name: '확인' }).isVisible();
  if (confirmButton) {
    await page.getByRole('button', { name: '확인' }).click();
  }

  await expect(page.locator('#sd_container')).toContainText('검색어 순위');
  await expect(page.locator('#sd_container')).toContainText('웹 사용 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('웹 사용 순위 - 사용자');
  await expect(page.locator('#sd_container')).toContainText('웹 사용 순위 - 카테고리');
  await expect(page.locator('#sd_container')).toContainText('웹 사용 순위 - 호스트');
  await expect(page.locator('#sd_container')).toContainText('웹 사용 추이');
  await expect(page.locator('#sd_container')).toContainText('웹 차단 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('웹 차단 순위 - 사용자');
  // await expect(page.locator('#sd_container div').filter({ hasText: '웹 차단 순위 - 카테고리' }).nth(1));
  await expect(page.locator('#sd_container')).toContainText('웹 차단 순위 - 카테고리');
  await expect(page.locator('#sd_container')).toContainText('웹 차단 순위 - 호스트');
  await expect(page.locator('#sd_container')).toContainText('웹 차단 추이');
  await expect(page.locator('#sd_container')).toContainText('넷앱 사용 순위 - 넷앱');
  await expect(page.locator('#sd_container')).toContainText('넷앱 사용 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('넷앱 사용 순위 - 사용자');
  await expect(page.locator('#sd_container')).toContainText('넷앱 사용 순위 - 카테고리');
  await expect(page.locator('#sd_container')).toContainText('넷앱 사용 추이');
  await expect(page.locator('#sd_container')).toContainText('넷앱 차단 순위 - 넷앱');
  await expect(page.locator('#sd_container')).toContainText('넷앱 차단 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('넷앱 차단 순위 - 사용자');
  await expect(page.locator('#sd_container')).toContainText('넷앱 차단 순위 - 카테고리');
  await expect(page.locator('#sd_container')).toContainText('넷앱 차단 추이');
  await expect(page.locator('#sd_container')).toContainText('악성코드 차단 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('악성코드 차단 순위 - 사용자');
  await expect(page.locator('#sd_container')).toContainText('악성코드 차단 순위 - 호스트');
  await expect(page.locator('#sd_container')).toContainText('악성코드 차단 추이');
  await expect(page.locator('#sd_container')).toContainText('포스트 크기 차단 순위 - 부서');
  await expect(page.locator('#sd_container')).toContainText('포스트 크기 차단 순위 - 사용자');
  await expect(page.locator('#sd_container')).toContainText('포스트 크기 차단 순위 - 카테고리');
  await expect(page.locator('#sd_container')).toContainText('포스트 크기 차단 순위 - 호스트');
  await expect(page.locator('#sd_container')).toContainText('포스트 크기 차단 추이');
  await expect(page.locator('#sd_container')).toContainText('WebKeeper 데이터베이스 업데이트 현황');
});

tcName = 'TC_WK_0000_Dashboard_Chagne_ComponentArrangement'
test(tcName, async ({ page, baseURL }) => {
  await page.goto(baseURL + 'dashboardInternet.sms');

  await page.waitForTimeout(5000)
  const confirmButton = await page.getByRole('button', { name: '확인' }).isVisible();
  if (confirmButton) {
    await page.getByRole('button', { name: '확인' }).click();
  }

  // await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '대시보드 설정' }).click();
  // await page.waitForTimeout(1000)
  await page.locator('.component_box_top_title > img').first().click();
  // await page.waitForTimeout(1000)
  await page.locator('#deleteButton').click();
  // await page.waitForTimeout(1000)
  await page.locator('.component_box_top_title > img').first().click();
  // await page.waitForTimeout(1000)
  await page.locator('#insertButton').click();
  // await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '적용' }).click();
  // await page.waitForTimeout(1000)
  await page.getByRole('button', { name: '확인' }).click();

  //페이지 리로딩
  await page.waitForTimeout(5000)
  const confirmButton2 = await page.getByRole('button', { name: '확인' }).isVisible();
  if (confirmButton2) {
    await page.getByRole('button', { name: '확인' }).click();
  }

  await expect(page.locator('#sd_container').getByText('검색어 순위')).toBeVisible();
});
