import { requestServices } from "./index";

const list = (params) =>
  requestServices.customAxios
    .post(`/api/report`, params)
    .then((res) => res.data);
export default {
  list
};
