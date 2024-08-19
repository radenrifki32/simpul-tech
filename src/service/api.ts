import axios from "axios";

export const instanceApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

