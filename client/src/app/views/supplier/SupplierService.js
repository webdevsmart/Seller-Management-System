import axios from "axios";

export const getAllSuppliers = () => {
  return axios.get("/api/suppliers/list");
};
export const getSupplierById = id => {
  return axios.get(`/api/suppliers/get?uid=${id}`);
};
export const deleteSupplier = mid => {
  return axios.post(`/api/suppliers/delete?uid=${mid}`);
};
export const addNewSupplier = NewSupplier => {
  return axios.post("/api/suppliers/add", NewSupplier);
};
export const updateSupplier = NewSupplier => {
  return axios.post("/api/suppliers/update", NewSupplier);
};
