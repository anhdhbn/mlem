import { requestServices } from "./index";

const listOrdered = (params) =>
  requestServices.customAxios
    .post(`/api/order/list`, params)
    .then((res) => res.data);

// API Xác nhận
// Them reservation là list bàn đặt [1, 2, 4]
const approveOrdered = (params) =>
  requestServices.customAxios
    .post(`​/api​/order​/approve`, params)
    .then((res) => res.data);

// API Xác nhận và từ chối đơn đặt hàng
const rejectOrdered = (params) =>
  requestServices.customAxios
    .post(`/api/order/reject`, params)
    .then((res) => res.data);

// API danh sach bàn và trạng thái
const listReservation = (params) =>
  requestServices.customAxios
    .post(`/api/order/list-reservation`, params)
    .then((res) => res.data);
const payment = (params) =>{
  requestServices.customAxios
  .post(`/api/order/done`,params)
  .then((res)=> res.data)
}
const deleteOrder = (params) =>{
  requestServices.customAxios
  .post(`/api/order/done`,params)
  .then((res)=> res.data)
}
export default {
  listOrdered,
  approveOrdered,
  rejectOrdered,
  listReservation,
  payment,
  deleteOrder
};
