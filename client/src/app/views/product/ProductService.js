import axios from "axios";

export const getAllProducts = () => {
  return axios.get("/api/products/list");
};
export const getProductById = id => {
  return axios.get(`/api/products/get?_id=${id}`);
};
export const deleteProduct = id => {
  return axios.post(`/api/products/delete?_id=${id}`);
};
export const addNewProduct = (newFormData, config) => {
  return axios.post("/api/products/add", newFormData, config);
};
export const updateProduct = NewProduct => {
  return axios.post("/api/products/update", NewProduct);
};