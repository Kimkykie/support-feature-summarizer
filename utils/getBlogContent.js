// api/run.js
const chromium = require("chrome-aws-lambda");

const SummarizerManager = require("node-summarizer").SummarizerManager;

let _page;

async function getPage() {
  if (_page) {
    return _page;
  }

  const options =
    process.env.IS_PROD === "1"
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: true
        }
      : {
          args: [],
          executablePath:
            process.platform === "win32"
              ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
              : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          headless: true
        };

  const browser = await chromium.puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

async function getBlogContent(url) {
  let browser;
  let content;

  try {
    // Edge executable will return an empty string locally.
    const page = await getPage();

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("main");

    content = await page.evaluate(() => {
      const container = document.querySelector(".article-container");
      const article = container.querySelector("#main-content");
      const section = article.querySelector(".article-content");
      const body = section.querySelector(".article-body");

      return body ? body.innerText : null;
    });

    if (!content) {
      throw new Error("No content found at the provided URL.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    content = null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  if (content) {
    const summarizer = new SummarizerManager(content, 30); // 3 sentences summary
    const summary = await summarizer.getSummaryByRank();
    return summary.summary;
  } else {
    return null;
  }
}

module.exports = getBlogContent;
