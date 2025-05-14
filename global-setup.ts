import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
 
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({
    width: 2000,
    height: 1000,
  });
  
  // await page.goto(baseURL + 'loginform.sms');
  // await page.locator('#uid').fill('somansa');
  // await page.locator('#upw').fill('Sms980502!');
  // await page.getByRole('button', { name: '로그인' }).click();
  // await page.context().storageState({ path: storageState as string });
  // await browser.close();
}

export default globalSetup;
