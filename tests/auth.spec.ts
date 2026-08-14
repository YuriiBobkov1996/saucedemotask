import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

const password = process.env.PASSWORD;

if (!password) {
  throw new Error('PASSWORD is not defined in .env');
}

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('shows error for invalid password', async ({ page }) => {
  await loginPage.login(users.standard, 'wrong_password');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match',
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test('shows error for locked out user', async ({ page }) => {
  await loginPage.login(users.lockedOut, password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
  await expect(page).not.toHaveURL(/inventory\.html/);
});
});