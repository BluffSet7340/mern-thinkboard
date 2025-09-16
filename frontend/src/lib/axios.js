import axios from "axios";

// /notes need to always be appended cuz that is the official baseurl per se
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001/api" : "/api"
const api =  axios.create({
    baseURL: BASE_URL,
})

export default api