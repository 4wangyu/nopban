const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('s.html');
const $ = cheerio.load(html, { normalizeWhitespace: true });

const results = [];
$('.item-root').each((i, el) => {
  const url = $(el).find('.title-text').attr('href');

  if (url.includes('subject')) {
    const title = $(el).find('.title-text').text();
    const img = $(el).find('img').attr('src');
    const metas = $(el)
      .find('.meta')
      .map((i, e) => $(e).text())
      .get();

    results.push({
      url,
      img,
      title,
      metas,
    });
  }
});
console.log(results);
