import cheerio from 'cheerio';
import { getBase64 } from '../../lib/util';
import {
  BookSearchItem,
  BookSearchPagination,
  Book,
  NameLinkModel,
} from '../../models/book.model';

function parseBookSearch(
  html: string
): { items: BookSearchItem[]; pagination: BookSearchPagination[] } {
  const $ = cheerio.load(html, { normalizeWhitespace: true });

  // parse items
  const items: BookSearchItem[] = [];
  $('.item-root').each((i, el) => {
    const url = $(el).find('.title-text').attr('href');

    if (url.includes('subject')) {
      const title = $(el).find('.title-text').text();
      const metas = $(el)
        .find('.meta')
        .map((i, e) => $(e).text())
        .get();

      items.push({
        url,
        title,
        metas,
        saved: false,
      });
    }
  });

  // parse pagination
  const pagination: BookSearchPagination[] = [];
  $('.paginator a').each((i, el) => {
    const url = $(el).attr('href');
    const start = url ? +url.split('=').reverse()[0] : null;

    const text = $(el).text();
    pagination.push({ start, text });
  });

  return { items, pagination };
}

async function parseBook(html: string): Promise<Partial<Book>> {
  const $ = cheerio.load(cheerio.load(html)("#wrapper").html());

  const title = $('h1 span:first-child').text();

  const imgSrc = $('.subject img').attr('src');
  const img = await getBase64(imgSrc);

  const writers: NameLinkModel[] = [];
  $('#info span:contains("作者")')
    .nextUntil('span:contains("出版社")', 'a')
    .each((idx, el) => {
      const name = $(el).text().trim();
      const link = $(el).attr('href');
      writers.push({ name, link });
    });

  const publisherEl = $('#info span:contains("出版社")').get(0);
  const publisher = publisherEl ? publisherEl.nextSibling.data.trim() : null;

  const subtitleEl = $('#info span:contains("副标题")').get(0);
  const subtitle = subtitleEl ? subtitleEl.nextSibling.data.trim() : null;

  const originTitleEl = $('#info span:contains("原作名")').get(0);
  const origin_title = originTitleEl
    ? originTitleEl.nextSibling.data.trim()
    : null;

  const translators: NameLinkModel[] = [];
  $('#info span:contains("译者")')
    .find('a')
    .each((idx, el) => {
      const name = $(el).text().trim();
      const link = $(el).attr('href');
      translators.push({ name, link });
    });

  const publishTimeEl = $('#info span:contains("出版年")').get(0);
  const publish_time = publishTimeEl
    ? publishTimeEl.nextSibling.data.trim()
    : null;

  const pageCountEl = $('#info span:contains("页数")').get(0);
  const page_count = pageCountEl ? pageCountEl.nextSibling.data.trim() : null;

  const priceEl = $('#info span:contains("定价")').get(0);
  const price = priceEl ? priceEl.nextSibling.data.trim() : null;

  const isbnEl = $('#info span:contains("ISBN")').get(0);
  const isbn = isbnEl ? isbnEl.nextSibling.data.trim() : null;

  return {
    title,
    img,
    writers,
    publisher,
    subtitle,
    origin_title,
    translators,
    publish_time,
    page_count,
    price,
    isbn,
  };
}

export { parseBookSearch, parseBook };
