import axios from "axios";

const http = axios.create({
    baseURL:"http://192.168.1.73:3001/",
    timeout : 10000,
    headers : {"Content-Type" : "application/json"}
})

export default http;