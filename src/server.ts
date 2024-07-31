import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://resume-maker-seven.vercel.app/', {
    waitUntil: 'networkidle2',
  });
  await page.setViewport({ width: 1680, height: 1050 });
  await page.pdf({
    path: 'MiladKarandish.pdf',
    format: 'A4',
    width: '1440',
    printBackground: true,
    displayHeaderFooter: false,
    scale: 0.5,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px',
    },
  });

  await browser.close();
  console.log('Done!');
})();
