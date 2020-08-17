import axios from "axios";

export const getAllFullfillment = () => {
  return axios.get("/api/fullfillment/list");
};
export const getFullfillmentById = id => {
  return axios.get(`/api/fullfillment/get?_id=${id}`);
};
export const deleteFullfillment = id => {
  return axios.post(`/api/fullfillment/delete?_id=${id}`);
};
export const addNewFullfillment = NewFullfillment => {
  return axios.post("/api/fullfillment/add", NewFullfillment);
};
export const updateFullfillment = NewFullfillment => {
  return axios.post("/api/fullfillment/update", NewFullfillment);
};
