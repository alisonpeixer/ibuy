import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.alissonpeixer.com/',
    timeout: 30000
})