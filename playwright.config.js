// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
