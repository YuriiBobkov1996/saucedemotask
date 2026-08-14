import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL is not defined in .env');
}


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {

    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
 projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },

  {
    name: 'auth-tests',
    testMatch: /auth\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'chromium',
    testIgnore: /auth\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
    dependencies: ['setup'],
  },
],


});
