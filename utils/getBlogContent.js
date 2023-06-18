const puppeteer = require("puppeteer");
const SummarizerManager = require("node-summarizer").SummarizerManager;

async function getBlogContent(url) {
  let browser;
  let content;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

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
