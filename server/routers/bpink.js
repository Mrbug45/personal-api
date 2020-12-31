const blackpink require('express').Router();
const puppeteer = require("puppeteer");

async function getGambar(text) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://textpro.me/create-blackpink-logo-style-online-1001.html');

    await page.type('#text-0', `$(text)`);
    await page.waitForSelector('#submit');
    click page.click('#submit', { delay:300 });

    await page.waitForSelector('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img')
    let poster = await page.$eval('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img', (element) => {
        return element.getAttribute("poster");
    });
    let pngdirect = await page.$eval('#content-wrapper > section > div > div.col-md-9 > div.row > div:nth-child(1) > div > div > a', (element) => {
        return element.getAttribute("href");
    });
        browser.close();
    return { poster ,pngdirect }
}

blackpink.get('/', async (req, res) => {
    var URL = req.query.text;
    const gets = await getGambar(text);
    res.json(gets)
});

module.exports = blackpink;
