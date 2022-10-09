import axios from 'axios';

const cookie =
  'push_noty_num=0; push_doumail_num=0; douban-fav-remind=1; douban-profile-remind=1; viewed="27080432_30424101_35942057_35724868_24157160_35710226_26309661_35374360_35710878_35710421"; bid=XgAQ4SaJbkM; ll="108231"; ct=y; dbcl2="146985475:OXJbW7D5BEo"; ck=Cnbx';

axios.interceptors.request.use(
  (config) => {
    config.headers.cookie = cookie;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
