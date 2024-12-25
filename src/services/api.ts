import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.15:8080/',
    timeout: 700
})