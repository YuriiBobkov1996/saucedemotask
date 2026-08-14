import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const password = process.env.PASSWORD;

if (!password) {
  throw new Error('PASSWORD is not defined in .env');
}

setup('authenticate standard user', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.open();
await loginPage.login(users.standard, password );
await expect(page).toHaveURL(/inventory\.html/);
fs.mkdirSync(path.dirname(authFile), { recursive: true });
await page.context().storageState({ path: authFile });

});