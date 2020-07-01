import { requestServices } from "./index";

const list = (params) =>
  requestServices.customAxios
    .post("api/notification/list", params)
    .then((res) => res.data);
const update = (params) => requestServices.customAxios
    .post("api/Notification/update",params)
    .then(res=>res.data);
const deleteNotify = (params) => requestServices.customAxios
    .post("api/Notification/bulk-delete",params)
    .then(res=>res.data);
export default {
  list,
  update,
  deleteNotify
};
