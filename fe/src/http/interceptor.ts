import axios from 'axios';

export default (callback: () => void) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        callback();
      } else {
        return Promise.reject(error);
      }
    }
  );
};
