const hnetai = require('express').Router();
const puppeteer = require("puppeteer");

async function getData(URL) {
  const browser = await puppeteer.launch({
     headless: true,
     args: ['--no-sandbox', '--disable-setuid-sandbox']
 });

 const page = await browser.newPage();
 await page.goto('https://api.computerfreaker.cf/');

 await page.click('body > div > div.center-object > div > div:nth-child(2) > a:nth-child(3)', { delay: 300 });

 await page.waitForSelector('body > pre', {delay: 300});
 let results = await page.$eval("body > pre", (element) => {
     return element.getAtributte("src")
 });
     browser.close();
 return { results }
}


hnetai.get('/', async (req, res) => {
  var URL = req.query.URL;
  const gets = await getData(URL);
  res.json(gets)
});

module.exports = hnetai;


