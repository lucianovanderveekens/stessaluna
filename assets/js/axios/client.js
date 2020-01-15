import axios from 'axios';
import store from '../store/store';
import { storeToken } from '../user/actions';

axios.interceptors.request.use(
  config => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._processed) {
      // to avoid an infinite loop
      originalRequest._processed = true;

      const refreshToken = store.getState().user.refreshToken;
      return axios.post('/api/token/refresh', { refreshToken })
        .then(res => {
          store.dispatch(storeToken(res.data));
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

export default axios;