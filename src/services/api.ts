import axios from "axios";

const api = axios.create({
    baseURL: "https://boards-api.greenhouse.io/v1/boards",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
