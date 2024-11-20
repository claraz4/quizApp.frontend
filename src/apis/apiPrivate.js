import axios from 'axios';

// Create an Axios instance
const apiPrivate = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
});

export default apiPrivate;
