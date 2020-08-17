import axios from "axios";

export const getAllParts = () => {
  return axios.get("/api/parts/list");
};
export const getPartsById = id => {
  return axios.get(`/api/parts/get?_id=${id}`);
};
export const deleteParts = id => {
  return axios.post(`/api/parts/delete?_id=${id}`);
};
export const addNewParts = NewParts => {
  return axios.post("/api/parts/add", NewParts);
};
export const updateParts = NewParts => {
  return axios.post("/api/parts/update", NewParts);
};
export const updatePartsList = PartsList => {
  return axios.post("/api/parts/update-list", PartsList);
}