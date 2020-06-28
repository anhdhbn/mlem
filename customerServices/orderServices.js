import { requestServices } from "./index";

const createOrder = (params) =>
  requestServices.customAxios
    .post(`/api/order/create`, params)
    .then((res) => res.data);
const getNumTableAvailable = (params) =>
  requestServices.customAxios
    .post(`/api/order/count-reservation`, params)
    .then((res) => res.data);
const listFood = (params) =>
  requestServices.customAxios
    .post(`/api/order/list-food`, params)
    .then((res) => res.data);
const listFoodRecently = (params) =>
  requestServices.customAxios
    .post(`/api/order/list-food-recently`, params)
    .then((res) => res.data);
const listFoodTopOrder = (params) =>
  requestServices.customAxios
    .post(`/api/order/list-food-top-order`, params)
    .then((res) => res.data);

const getFood = (params) =>
  requestServices.customAxios
    .post("api/food/get", params)
    .then((res) => res.data);

export default {
  createOrder,
  getNumTableAvailable,
  listFood,
  listFoodRecently,
  listFoodTopOrder,
  getFood,
};
