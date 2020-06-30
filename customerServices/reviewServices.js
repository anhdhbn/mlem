import { requestServices } from "./index";

const comment = (params) =>
  requestServices.customAxios
    .post(`api/food/comment`, params)
    .then((res) => res.data);

const vote = (params) =>
  requestServices.customAxios
    .post(`api/food/vote`, params)
    .then((res) => res.data);

export default {
  vote,
  comment,
};
