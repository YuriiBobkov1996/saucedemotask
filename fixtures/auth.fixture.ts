import { test as base } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export const test = base.extend({
  storageState: async ({}, use) => {
    await use(authFile);
  },
});

export { expect } from '@playwright/test';