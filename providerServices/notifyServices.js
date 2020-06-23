import { requestServices } from "./index";

const list = (params) =>
  requestServices.customAxios
    .post("api/notification/list", params)
    .then((res) => res.data);

export default {
  list,
};
