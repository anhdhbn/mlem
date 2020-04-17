// @flow
import axios from "axios";

export const BASE_API_URL = "https://mlem.herokuapp.com/";

const customAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const { code, type, message } = data;
      // message error
      console.log("[ERROR] In requests.js: ", code, type, message, data);
    }
    return Promise.reject(error);
  }
);

export default { customAxios };
