import puppeteer, { Browser } from 'puppeteer';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';

// Reuse browser instance throughout lifetime of server.
let browser: Browser;

async function puppet() {
  // Launch new instance of browser to reuse it across requests.
  if (!browser) {
    browser = await puppeteer.launch({ headless: true });
  }
  const page = await browser.newPage();

  // Anti Bot Detection
  await page.setUserAgent(USER_AGENT);
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  });

  // No unwanted resources
  await page.setRequestInterception(true);
  const block_ressources = [
    'image',
    'stylesheet',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
  ];
  page.on('request', (request) => {
    if (block_ressources.indexOf(request.resourceType()) > 0) request.abort();
    else request.continue();
  });

  return page;
}

export default puppet;
