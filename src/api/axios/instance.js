import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const instance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

const getUserAccessToken = () => {
    const userString = localStorage.getItem("user");

    try {
        const { accessToken } = JSON.parse(userString || '{}');
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
const getRequest = (url) => makeRequest('get', url);
const getPublicRequest = (url) => axios.get(url);
const postPublicRequest = (url, data) => axios.post(url, data);

export { postRequest, getRequest, postPublicRequest, getPublicRequest };

export default instance;


// import axios from 'axios';

// const baseURL = process.env.API_DOMAIN || 'http://localhost:8000/';
// console.log(baseURL);

// const instance = axios.create({
//     baseURL,
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//     },
//     withCredentials: true,
// });

// const getUserAccessToken = () => {
//     const userString = localStorage.getItem("user");

//     try {
//         const { accessToken } = JSON.parse(userString || '{}');
//         return accessToken;
//     } catch (error) {
//         console.error("Error parsing user information from localStorage", error);
//         return null;
//     }
// };

// const attachBearerToken = (config) => {
//     const { accessToken } = getUserAccessToken() || {};
//     if (accessToken) {
//         // config.headers = Object.assign({}, config.headers, { 'Authorization': `Bearer ${accessToken}` });
//         // Alternatively, using the spread operator:
//         config.headers = { ...config.headers, 'Authorization': `Bearer ${accessToken}` };
//     }
//     return config;
// };

// instance.interceptors.request.use(attachBearerToken, (error) => {
//     console.error("Request interceptor error", error);
//     return Promise.reject(error);
// });


// const makeRequest = (instance, method, url, data = {}) => {
//     return instance({
//         method,
//         url,
//         data,
//     });
// };

// const postRequest = (url, data) => makeRequest(instance, 'post', url, data);
// const getRequest = (url) => makeRequest(instance, 'get', url);
// const postPublicRequest = (url, data) => makeRequest(axios, 'post', url, data);
// const getPublicRequest = (url) => makeRequest(axios, 'get', url);

// export { postRequest, getRequest, postPublicRequest, getPublicRequest };

// export default instance;
