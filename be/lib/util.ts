import axios from 'axios';
import { NameLinkModel } from '../models/movie.model';

async function getBase64(url: string): Promise<string> {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      Referer: 'https://douban.com/',
    },
  });

  const imgBase64 = Buffer.from(res.data, 'binary').toString('base64');
  return imgBase64;
}

function arrToStr(strs: string[]): string {
  if (strs && strs.length) {
    return strs.filter((s) => !!s).join(' / ');
  } else {
    return '';
  }
}

function getName(os: NameLinkModel[]): string[] {
  return os.map((o) => o.name);
}

function getUuidFromUrl(url: string): string {
  return url.split('/').reverse()[1];
}

function dateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}
export { getBase64, arrToStr, getName, getUuidFromUrl, dateToString };
