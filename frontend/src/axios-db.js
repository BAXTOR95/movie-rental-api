import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DJANGO_SERVER_DEV : process.env.REACT_APP_DJANGO_SERVER_PROD,
});

export default instance;