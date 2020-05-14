import { requestServices } from "./index";

const listOrdered = (params) =>
  requestServices.customAxios
    .post(`/api/order/list`, params)
    .then((res) => res.data);
export default {
  listOrdered,
};
