const axios = require('axios');

async function getBase64(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const img64 = Buffer.from(res.data, 'binary').toString('base64');
  console.log(img64);
}

getBase64(
  'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p1987090795.jpg'
);
