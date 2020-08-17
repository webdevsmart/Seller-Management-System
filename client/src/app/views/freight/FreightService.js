import axios from "axios";

export const getAllFreight = () => {
  return axios.get("/api/freight/list");
};
export const getFreightById = id => {
  return axios.get(`/api/freight/get?_id=${id}`);
};
export const deleteFreight = id => {
  return axios.post(`/api/freight/delete?_id=${id}`);
};
export const addNewFreight = NewFreight => {
  return axios.post("/api/freight/add", NewFreight);
};
export const updateFreight = NewFreight => {
  return axios.post("/api/freight/update", NewFreight);
};
