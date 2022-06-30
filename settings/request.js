import axios from "axios";

const request = axios.create(
    {
        baseURL: `https://hangover.timotheedurand.fr/api/`
    }
);

export default request;