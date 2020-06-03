const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('movie.html');
const $ = cheerio.load(html);

const title = $('h1 span:first-child').text();
const year = $('h1 .year').text().substring(1, 5);
const poster = $('.subject img').attr('src');

const directors = [];
$('a[rel="v:directedBy"]').each((idx, el) => {
  const name = $(el).text();
  const link = $(el).attr('href');
  directors.push({ name, link });
});

const playwriters = [];
$('span:contains("编剧")')
  .find('a')
  .each((idx, el) => {
    const name = $(el).text();
    const link = $(el).attr('href');
    playwriters.push({ name, link });
  });

const actors = [];
$('.actor a[rel="v:starring"]').each((idx, el) => {
  const name = $(el).text();
  const link = $(el).attr('href');
  actors.push({ name, link });
});

const genres = [];
$('span[property="v:genre"]').each((idx, el) => {
  const genre = $(el).text();
  genres.push(genre);
});

const website = $('span:contains("官方网站")').next().attr('href');

const countries = $('span:contains("制片国家")')
  .get(0)
  .nextSibling.data.split('/')
  .map((c) => c.trim());

const languages = $('span:contains("语言")')
  .get(0)
  .nextSibling.data.split('/')
  .map((l) => l.trim());

const releaseDates = [];
$('span[property="v:initialReleaseDate"]').each((i, e) => {
  releaseDates.push($(e).attr('content'));
});

const episodesEl = $('span:contains("集数")').get(0);
const episodes = episodesEl ? episodesEl.nextSibling.data.trim() : null;

const runtime = $('span[property="v:runtime"]').text();
const episodeRuntimeEl = $('span:contains("单集片长")').get(0);
const episodeRuntime = episodeRuntimeEl
  ? episodeRuntimeEl.nextSibling.data.trim()
  : null;

const aliases = $('span:contains("又名")')
  .get(0)
  .nextSibling.data.split('/')
  .map((a) => a.trim());

const imdb = $('a:contains("tt")').attr('href');

console.log({
  title,
  year,
  poster,
  directors,
  playwriters,
  actors,
  genres,
  website,
  countries,
  languages,
  releaseDates,
  episodes,
  runtime,
  episodeRuntime,
  aliases,
  imdb,
});
