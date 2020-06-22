// @flow
import axios from "axios";

export const BASE_API_URL = "http://admin.wepick.vn:20000";
//export const BASE_API_URL = "https://376fafd8.ngrok.io";

const customAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  // (response) => {
  //   response, console.log("[INFO] Response in request: ", response.data.token);
  // },
  (response) => {
    const token = response.data.token;
    if (token) {
      response.headers["Token"] = token;
    }
    // response.headers['Content-Type'] = 'application/json';
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      // Lay cai message này
      const { code, type, message } = data;
      // message error
     /*  console.log("[ERROR] In requests.js: ", code, type, message, data); */
    
    }
    return error.response
  }
);

export default { customAxios };
