import axios from "axios";
import { config } from "process";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || "http://localhost:8092/api",
})

instance.interceptors.response.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

export { instance }