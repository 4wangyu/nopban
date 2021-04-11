import cheerio from 'cheerio';
import { getBase64 } from '../../lib/util';
import {
  Music,
  MusicSearchItemType,
  MusicSearchPagination,
  NameLinkModel,
} from '../../models/music.model';

function parseMusicSearch(
  html: string
): { items: MusicSearchItemType[]; pagination: MusicSearchPagination[] } {
  const $ = cheerio.load(html, { normalizeWhitespace: true });

  // parse items
  const items: MusicSearchItemType[] = [];
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
  const pagination: MusicSearchPagination[] = [];
  $('.paginator a').each((i, el) => {
    const url = $(el).attr('href');
    const start = url ? +url.split('=').reverse()[0] : null;

    const text = $(el).text();
    pagination.push({ start, text });
  });

  return { items, pagination };
}

async function parseMusic(html: string): Promise<Partial<Music>> {
  const $ = cheerio.load(cheerio.load(html)('#wrapper').html());

  const title = $('h1 span:first-child').text();

  const imgSrc = $('.subject img').attr('src');
  const img = await getBase64(imgSrc);

  const musician: NameLinkModel[] = [];
  $('#info span:contains("表演者")')
    .find('a')
    .each((idx, el) => {
      const name = $(el).text();
      const link = $(el).attr('href');
      musician.push({ name, link });
    });

  const genreEl = $('#info span:contains("流派")').get(0);
  const genre = genreEl ? genreEl.nextSibling.data.trim() : null;

  const albumTypeEl = $('#info span:contains("专辑类型")').get(0);
  const album_type = albumTypeEl ? albumTypeEl.nextSibling.data.trim() : null;

  const mediumEl = $('#info span:contains("介质")').get(0);
  const medium = mediumEl ? mediumEl.nextSibling.data.trim() : null;

  const publishTimeEl = $('#info span:contains("发行时间")').get(0);
  const publish_time = publishTimeEl
    ? publishTimeEl.nextSibling.data.trim()
    : null;

  const publisherEl = $('#info span:contains("出版者")').get(0);
  const publisher = publisherEl ? publisherEl.nextSibling.data.trim() : null;

  const cdCountEl = $('#info span:contains("唱片数")').get(0);
  const cd_count = cdCountEl ? +cdCountEl.nextSibling.data.trim() : null;

  const barcodeEl = $('#info span:contains("条形码")').get(0);
  const barcode = barcodeEl ? barcodeEl.nextSibling.data.trim() : null;

  return {
    title,
    img,
    musician,
    genre,
    album_type,
    medium,
    publish_time,
    publisher,
    cd_count,
    barcode,
  };
}

export { parseMusicSearch, parseMusic };
