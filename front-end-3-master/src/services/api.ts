import _axios from 'axios';

export const axios = _axios.create({
    baseURL: 'http://localhost:8080',
});
