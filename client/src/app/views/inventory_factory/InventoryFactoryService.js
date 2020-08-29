import axios from "axios";

export const addNewFactoryReport = (data) => {
  return axios.post("/api/inventory-factory/add", data);
}
export const getInventoryFactoryById = (id) => {
  return axios.get("/api/inventory-factory/get?_id=" + id);
}
export const updateFactoryReport = (data) => {
  return axios.post("/api/inventory-factory/update", data);
}