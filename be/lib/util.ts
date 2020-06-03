import axios from 'axios';
import { NameLinkModel } from '../models/movie.model';

async function getBase64(url: string): Promise<string> {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const imgBase64 = Buffer.from(res.data, 'binary').toString('base64');
  return imgBase64;
}

function arrToStr(strs: string[]): string {
  if (strs && strs.length) {
    return strs.join(' / ');
  } else {
    return '';
  }
}

function getName(os: NameLinkModel[]): string[] {
  return os.map((o) => o.name);
}

export { getBase64, arrToStr, getName };
