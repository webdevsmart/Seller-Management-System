import axios from "axios";

export const getAllStorage = () => {
  return axios.get("/api/storage/list");
};
export const getStorageById = id => {
  return axios.get(`/api/storage/get?_id=${id}`);
};
export const deleteStorage = id => {
  return axios.post(`/api/storage/delete?_id=${id}`);
};
export const addNewStorage = NewStorage => {
  return axios.post("/api/storage/add", NewStorage);
};
export const updateStorage = NewStorage => {
  return axios.post("/api/storage/update", NewStorage);
};
