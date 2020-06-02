import { requestServices } from "./index";

// API Danh sách món ăn

const list = (params) => requestServices.customAxios
    .post("api/food/list", params)
    .then((res) => res.data);

const configJSON = {
  headers: {
    "Content-Type": "application/json",
  },
};
// API Thêm món ăn
const createDish = (params, configJSON) =>
  requestServices.customAxios
    .post("/api/food/create", params)
    .then((res) => res.data);

// API Sửa món ăn
const updateDish = (params) =>
  requestServices.customAxios
    .post("api/food/update", params)
    .then((res) => res.data);

// API Xóa món ăn
const deleteDish = (params) =>
  requestServices.customAxios
    .post("api/food/delete", params)
    .then((res) => res.data);

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const uploadImage = (params) =>
  requestServices.customAxios
    .post(`api/image/upload`, params, config)
    .then((res) => res.data);

export default {
  list,
  createDish,
  updateDish,
  deleteDish,
  uploadImage,
}