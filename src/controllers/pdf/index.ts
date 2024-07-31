import { Request, Response } from 'express';
import puppeteer from 'puppeteer';

export const getPdfFromPage = async (url: string, name: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  await page.setViewport({ width: 1680, height: 1050 });
  const pdf = await page.pdf({
    // path: `${name}.pdf`,
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

  return pdf;
};

export const getPageAsPdf = async (
  req: Request<{ url: string; name: string }>,
  res: Response
) => {
  const { url, name } = req.body;

  try {
    const pdf = await getPdfFromPage(url, name);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=name.Pdf');
    res.setHeader('Content-Length', pdf.length);
    res.status(200).send(pdf);
  } catch (error) {
    res.status(500).send({ message: 'Error generating PDF' });
  }
};
