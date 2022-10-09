import axios from 'axios';
import https from 'https';

axios.interceptors.request.use(
  async (config) => {
    return new Promise((resolve, reject) => {
      https
        .get(process.env.COOKIE, function (res) {
          const bodyChunks: Uint8Array[] = [];
          res
            .on('data', function (chunk) {
              bodyChunks.push(chunk);
            })
            .on('end', function () {
              config.headers.cookie = Buffer.concat(bodyChunks);
              resolve(config);
            });
        })
        .on('error', function (e) {
          reject(e);
        });
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
