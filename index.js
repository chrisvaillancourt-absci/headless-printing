(async () => {
  try {
    const [{ chromium }, dotenv] = await Promise.all([
      import('playwright'),
      import('dotenv'),
    ]);

    dotenv.config();

    const {
      env: { USERNAME, PASSWORD, URL },
    } = process;
    const opts = { headless: false, slowMo: 100 };

    if (!USERNAME && !PASSWORD)
      throw new Error(
        `"USERNAME" and "PASSWORD" environmental variables required.
        Please create a .env file in the project root and set USERNAME=your_username PASSWORD=your_password.`
      );
    if (!URL)
      throw new Error(
        `"URL environmental variable required. Please create a .env file in the project root and set URL=some_url`
      );
    const browser = await chromium.launch(opts);
    const page = await browser.newPage();
    await page.goto(URL);
    await page.click('.firebaseui-idp-button');
    await page.fill('input[name="identifier"]', USERNAME);
    await page.click('#identifierNext div button');
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('#passwordNext div button');
    await page.click('a[href="/report"]');
    await page.click('label[for="submission-id"]');
    await page.click('.report-item');
    await page.click('#samples-input');
    await page.click('#samples-select-all');
    page.emulateMedia('screen');
    // await page.pdf({ path: 'report.pdf' }); // Results in an error
    const el = await page.$('#pdfContent');
    await el.screenshot({ path: 'report.png' });
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
