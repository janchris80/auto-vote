// api/axios folder
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        // 'Accept': 'application/vnd.api+json',
        // 'Content-Type': 'application/vnd.api+json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// Laravel Sanctum provides a route to retrieve the CSRF token
// export const fetchCSRFToken = async () => {
//     try {
//         const response = await instance.get('/sanctum/csrf-cookie');
//         console.log('response', response);
//         return response;
//     } catch (error) {
//         console.error('Failed to fetch CSRF token', error);
//         throw error;
//     }
// };

// Add an interceptor to include CSRF token in the headers
// instance.interceptors.request.use(
//     async (config) => {
//         try {
//             const csrfToken = await fetchCSRFToken();  // Ensure CSRF token is fetched before making the request
//             config.headers['X-XSRF-TOKEN'] = csrfToken;
//         } catch (error) {
//             console.error('Error setting CSRF token in request headers', error);
//             return Promise.reject(error); // Reject the request in case of an error
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
