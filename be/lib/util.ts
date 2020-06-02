import axios from 'axios';

export async function getBase64(url: string): Promise<string> {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const imgBase64 = Buffer.from(res.data, 'binary').toString('base64');
  return imgBase64;
}
