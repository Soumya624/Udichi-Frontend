import axios from "axios";

console.log(process.env.REACT_APP_BASE_URL)

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/",
})

export default axiosInstance