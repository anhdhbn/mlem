import { requestServices } from "./index";

// API Danh sách bàn và trạng thái
const list = (params) =>
  requestServices.customAxios
    .post(`api​/table​/list`, params)
    .then((res) => res.data);

//API Xóa bàn
const deleteTable = (params) =>
  requestServices.customAxios
    .post(`api/table/delete`, params)
    .then((res) => res.data);

// API Sửa trạng thái bàn
// => Xóa đi tạo lại :)
const createTable = (params) =>
  requestServices.customAxios
    .post(`api/table/create`, params)
    .then((res) => res.data);

export default {
  list,
  deleteTable,
  createTable,
};
