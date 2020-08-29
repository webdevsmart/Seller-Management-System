import axios from "axios";

export const getCompiledReport = (data) => {
  return axios.post("/api/inventory-forecast/report", data);
};
export const addNewOEMOrder = (data) => {
  return axios.post("/api/oem-order/add", data);
};
export const getOEMOrderById = (id) => {
  return axios.post("/api/oem-order/get?_id=" + id);
};