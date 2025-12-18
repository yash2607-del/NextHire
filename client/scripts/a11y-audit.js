import { chromium } from 'playwright';
import axe from 'axe-core';
import fs from 'fs/promises';

// Usage: node client/scripts/a11y-audit.js [url]
const url = process.argv[2] || 'http://localhost:5173';

(async () => {
  console.log(`Starting accessibility audit for ${url}`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    // inject axe-core source
    await page.addScriptTag({ content: axe.source });
    const results = await page.evaluate(async () => {
      return await axe.run();
    });
    await fs.writeFile('a11y-report.json', JSON.stringify(results, null, 2));
    console.log(`Accessibility violations: ${results.violations.length}`);
    results.violations.forEach(v => {
      console.log(`- ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
    });
  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    await browser.close();
  }
})();
