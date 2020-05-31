const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('s.html');
const $ = cheerio.load(html, { normalizeWhitespace: true });

const items = [];
$('.item-root').each((i, el) => {
  const url = $(el).find('.title-text').attr('href');

  if (url.includes('subject')) {
    const title = $(el).find('.title-text').text();
    const img = $(el).find('img').attr('src');
    const metas = $(el)
      .find('.meta')
      .map((i, e) => $(e).text())
      .get();

    items.push({
      url,
      img,
      title,
      metas,
    });
  }
});
console.log(items);

const pagination = [];
$('.paginator a').each((i, el) => {
  const url = $(el).attr('href');
  if (url) {
    const start = url.split('=').reverse()[0];
    const text = $(el).text();
    pagination.push({ start, text });
  }
});
console.log(pagination);
