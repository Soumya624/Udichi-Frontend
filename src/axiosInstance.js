import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL || "https://udichi-server-testing.onrender.com",
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/",
})

export default axiosInstance