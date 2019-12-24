import axios from "axios";
// deprecated
const BASE_URL = "https://app-13a41883-30f6-425f-b5f7-7264fc31a1e7.cleverapps.io";
// deprecated
const fetchAPI = async endpoint => await axios.get(`${BASE_URL}/${endpoint}`);

export { BASE_URL, fetchAPI };
