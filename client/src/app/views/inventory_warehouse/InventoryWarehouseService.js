import axios from "axios";

export const getInventoryReport = (data) => {
  return axios.post("/api/inventory-warehouse/report", data);
};
export const addNewInventoryReport = (data) => {
  return axios.post("/api/inventory-warehouse/add", data);
};
export const getInventoryReportById = (id) => {
  return axios.get("/api/inventory-warehouse/get?_id=" + id)
}
export const updateInventoryReportById = (data) => {
  return axios.post("/api/inventory-warehouse/update", data)
}