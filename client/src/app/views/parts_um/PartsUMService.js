import axios from "axios";

export const getAllPartsUM = () => {
  return axios.get("/api/parts-um/list");
};
export const getPartsUMById = id => {
  return axios.get(`/api/parts-um/get?_id=${id}`);
};
export const deletePartsUM = id => {
  return axios.post(`/api/parts-um/delete?_id=${id}`);
};
export const addNewPartsUM = NewPartsUM => {
  return axios.post("/api/parts-um/add", NewPartsUM);
};
export const updatePartsUM = NewPartsUM => {
  return axios.post("/api/parts-um/update", NewPartsUM);
};
