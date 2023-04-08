import axios, { AxiosInstance, CancelTokenSource } from 'axios';

const webAPI: AxiosInstance = axios.create();
webAPI.defaults.baseURL = process.env.API_BASE_URL || 'https://jwt.jee6.in';
webAPI.defaults.timeout = 10000;

const pendingRequests = new Map<string, CancelTokenSource>();

const addPendingRequest = (config: any) => {
  const url = `${config.url}&${config.method}`;
  const source = axios.CancelToken.source();

  if (!pendingRequests.has(url)) pendingRequests.set(url, source);
};

const removePendingRequest = (config: any) => {
  const url = `${config.url}&${config.method}`;

  if (pendingRequests.has(url)) {
    const source = pendingRequests.get(url);
    source?.cancel();
    pendingRequests.delete(url);
  }
};

webAPI.interceptors.request.use(
  (config) => {
    removePendingRequest(config);
    addPendingRequest(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

webAPI.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config);
    return response?.data?.data;
  },
  (error) => {
    removePendingRequest(error.config);
    return Promise.reject(error);
  }
);

export default webAPI;