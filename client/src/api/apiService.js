import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

const API = axios.create({
    timeout: 30000,
    retry: 1,
    retryDelay: 1000,
});

function onRequest(config) {
    const customConfig = config;
    const tokenExist = customConfig.headers.Authorization;
    if (!tokenExist) {
        let token = JSON.parse(localStorage.getItem('token'))
        customConfig.headers.Authorization = "bearer " + token;
    } else if (config.token && !tokenExist) {
        window.location = '/login'
    }
    return config;
}

function onRequestError(error) {
    let newErrorResponse = {
        data: error.response.data.data ? error.response.data.data : error.response.data
    };
    return Promise.reject(newErrorResponse);
}

function onResponse(response) {
    let newResponse = {};
    if (response && typeof response.data === 'string')
        response.data = JSON.parse(response.data);
    newResponse = response.data;
    return Promise.resolve(newResponse);
}

function onResponseError(error) {
    let newErrorResponse = {
        data: error.response
    };
    // if (newErrorResponse.data.status === 401 || newErrorResponse.data.status === 500) {
    //     window.location.hash = '';
    // }
    return Promise.reject(newErrorResponse);
}

API.interceptors.request.use(onRequest, onRequestError);
API.interceptors.response.use(onResponse, onResponseError);

const apiService = function(type, url, method, data, tokenParam ) {
    return {
        type,
        promise: API.request({
            url: BASE_URL + url,
            method,
            data: JSON.stringify(data),
            tokenParam
        })
    }
}
export default apiService;