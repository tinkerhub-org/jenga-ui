import axios, { AxiosError, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.withCredentials = true;
interface RequestReturn<T> {
    data: T | null;
    error: AxiosError | null;
}

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || 'jenga_access_token';

/**
 * An axios interceptor to convert js camelcase to python api
 * canvert camelCase to snakecase
 */
axios.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

/**
 * A request wrapper for axios
 * @param options - all configuration for axios instance, methods, params
 * @param type - content type header
 * @returns {Promise<object>}: {data:<result | undefined>, error:<error | undefined>}
 */
export const request = async <T extends unknown>(
    options: AxiosRequestConfig,
    type = 'json'
): Promise<RequestReturn<T>> => {
    const headers = {
        'Content-Type': `application/${type}`,
        'Access-Control-Allow-Credentials': true,
    };
    Object.assign(options, { headers });
    try {
        const { data } = await axios(options);
        return { error: null, data };
    } catch (error) {
        return { error, data: null };
    }
};
