import axios from "axios";

export const instanceApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
});

