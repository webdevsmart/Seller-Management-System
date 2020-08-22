import axios from "axios";

export const getInventoryReport = (data) => {
  return axios.post("/api/inventory-warehouse/report", data);
};
export const addNewInventoryReport = (data) => {
  return axios.post("/api/inventory-warehouse/add", data);
}