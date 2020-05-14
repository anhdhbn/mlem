import { requestServices } from "./index";

const get = () =>
  requestServices.customAxios.post(`api/account/get`).then((res) => res.data);

const update = (params) =>
  requestServices.customAxios
    .post(`api/account/update`, params)
    .then((res) => res.data);

export default {
  get,
  update,
};
