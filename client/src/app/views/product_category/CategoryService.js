import axios from "axios";

export const getAllCategories = () => {
  return axios.get("/api/product-category/list");
};
export const getCategoryById = id => {
  return axios.get(`/api/product-category/get?uid=${id}`);
};
export const deleteCategory = id => {
  return axios.post(`/api/product-category/delete?uid=${id}`);
};
export const addNewCategory = NewCategory => {
  return axios.post("/api/product-category/add", NewCategory);
};
export const updateCategory = NewCategory => {
  return axios.post("/api/product-category/update", NewCategory);
};
