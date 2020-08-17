import axios from "axios";

export const getAllPartsType = () => {
  return axios.get("/api/parts-type/list");
};
export const getPartsTypeById = id => {
  return axios.get(`/api/parts-type/get?_id=${id}`);
};
export const deletePartsType = id => {
  return axios.post(`/api/parts-type/delete?_id=${id}`);
};
export const addNewPartsType = NewPartsType => {
  return axios.post("/api/parts-type/add", NewPartsType);
};
export const updatePartsType = NewPartsType => {
  return axios.post("/api/parts-type/update", NewPartsType);
};
