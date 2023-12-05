import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_DOMAIN
    : process.env.REACT_APP_API_DOMAIN_LOCAL;

console.log("baseUrl: ", baseURL);
console.log("process.env ", process.env);

const instance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

instance.createCancelToken = () => axios.CancelToken.source();

const getUserAccessToken = () => {
    const userString = localStorage.getItem("persist:root");

    try {
        const { auth } = JSON.parse(userString || '{}');
        const { accessToken } = JSON.parse(auth || '{}');
        return accessToken;
    } catch (error) {
        console.error("Error parsing user information from localStorage", error);
        return null;
    }
};

const attachBearerToken = (config) => {
    const accessToken = getUserAccessToken();
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
};

instance.interceptors.request.use(attachBearerToken, (error) => {
    console.error("Request interceptor error", error);
    return Promise.reject(error);
});

const makeRequest = (method, url, data = {}) => {
    return instance({
        method,
        url,
        data,
    });
};

const postRequest = (url, data) => makeRequest('post', url, data);
const putRequest = (url, data) => makeRequest('put', url, data);
const getRequest = (url) => makeRequest('get', url);
const getPublicRequest = (url) => axios.get(url);
const postPublicRequest = (url, data) => axios.post(url, data);

export { postRequest, getRequest, putRequest, postPublicRequest, getPublicRequest, getUserAccessToken };

export default instance;

