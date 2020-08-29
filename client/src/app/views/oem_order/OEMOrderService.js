import axios from "axios";

export const getAllOrders = () => {
  return axios.get("/api/oem-order/list");
};
export const getOEMOrder = (id) => {
  return axios.get("/api/oem-order/get?_id=" + id);
}
export const downloadPartsExcel = (ids) => {
  return axios.post("/api/oem-order/download", ids, {responseType: 'blob'});
}