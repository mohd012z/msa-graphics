import {defineConfig} from '@playwright/test';

// Serves the Android WebView assets over HTTP so the studios run exactly as shipped.
// PW_CHROME_PATH lets a local run use an installed Chrome instead of the downloaded one.
export default defineConfig({
  testDir: 'tests/ui',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:8765',
    viewport: {width: 390, height: 844},
    launchOptions: process.env.PW_CHROME_PATH
      ? {executablePath: process.env.PW_CHROME_PATH, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']}
      : {},
  },
  projects: [{name: 'chromium', use: {browserName: 'chromium'}}],
  webServer: {
    command: 'python3 -m http.server 8765 --bind 127.0.0.1 --directory android/app/src/main/assets',
    url: 'http://127.0.0.1:8765/index.html',
    reuseExistingServer: !process.env.CI,
  },
});
