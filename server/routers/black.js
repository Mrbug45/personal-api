const black = require('express').Router();
const puppeteer = require("puppeteer");

async function getData(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://textpro.me/create-blackpink-logo-style-online-1001.html');

    await page.type('#text-0', `$(URL)`);
    await page.click('#submit', { delay: 300 });

    await page.waitForSelector('#share_link', {delay: 300});
    let images = await page.$eval('#share_link', (element) => {
        return element.getAttribute("src");
    });
        browser.close();
    return { images }
}

black.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getData(URL);
    res.json(gets)
});

module.exports = black;
