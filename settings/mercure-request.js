import axios from "axios";
import config from "./config";

const mercureRequest = axios.create({
    baseURL: config.request.baseURL,
    headers: config.request.globalHeaders
});


export default mercureRequest;