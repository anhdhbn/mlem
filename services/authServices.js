import { requestServices } from "./index";
// http://mlem.herokuapp.com/auth/swagger/index.html
const login = (params) =>
  requestServices.customAxios
    .post(`api/account/login`, params)
    .then((res) => res.data);
const forgotPassword = (params) =>
  requestServices.customAxios
    .post(`api/account/forgot-password`, params)
    .then((res) => res.data);
const verifyCode = (params) =>
  requestServices.customAxios
    .post(`api/account/verify-code`, params)
    .then((res) => res.data);
const recoveryPass = (params) =>
  requestServices.customAxios
    .post(`api​/account​/recovery-password`, params)
    .then((res) => res.data);
// Not work
// const getUserInfoByUsername = (username) => requestServices.customAxios.get(`user/${username}`).then((res) => res.data);
// const updateUserInfoByUsername = (username, params) => requestServices.customAxios.put(`user/${username}`, params).then((res) => res.data);
// const logout = () => requestServices.customAxios.get(`user/logout`, params).then((res) => res.data);
const createUser = (params) =>
  requestServices.customAxios
    .post(`api/account/register`, params)
    .then((res) => res.data);

export default {
  login,
  forgotPassword,
  verifyCode,
  recoveryPass,
  // getUserInfoByUsername,
  // updateUserInfoByUsername,
  // logout,
  createUser,
};
