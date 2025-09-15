import axios from "axios";

// /notes need to always be appended cuz that is the official baseurl per se
const api =  axios.create({
    baseURL: "http://localhost:5001/api"
})

export default api