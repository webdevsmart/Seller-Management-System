import axios from "axios";

export const getAllSupplierTypes = () => {
  return axios.get("/api/supplier-type/list");
};
export const getSupplierTypeById = id => {
  return axios.get(`/api/supplier-type/get?uid=${id}`);
};
export const deleteSupplierType = id => {
  return axios.post(`/api/supplier-type/delete?uid=${id}`);
};
export const addNewSupplierType = NewSupplierType => {
  return axios.post("/api/supplier-type/add", NewSupplierType);
};
export const updateSupplierType = NewSupplierType => {
  return axios.post("/api/supplier-type/update", NewSupplierType);
};
