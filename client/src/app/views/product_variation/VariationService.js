import axios from "axios";

export const getAllVariation = () => {
  return axios.get("/api/product-variation/list");
};
export const getVariationById = id => {
  return axios.get(`/api/product-variation/get?_id=${id}`);
};
export const deleteVariation = id => {
  return axios.post(`/api/product-variation/delete?_id=${id}`);
};
export const addNewVariation = NewVariation => {
  return axios.post("/api/product-variation/add", NewVariation);
};
export const updateVariation = NewVariation => {
  return axios.post("/api/product-variation/update", NewVariation);
};
export const getAllVariationType = () => {
  return axios.get("/api/product-variation/type_list");
}
export const getAllVariationValue = (type) => {
  return axios.get(`/api/product-variation/value_list?type=${type}`);
}