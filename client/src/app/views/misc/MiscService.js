import axios from "axios";

export const getAllMisc = () => {
  return axios.get("/api/misc/list");
};
export const getMiscById = id => {
  return axios.get(`/api/misc/get?_id=${id}`);
};
export const deleteMisc = id => {
  return axios.post(`/api/misc/delete?_id=${id}`);
};
export const addNewMisc = NewMisc => {
  return axios.post("/api/misc/add", NewMisc);
};
export const updateMisc = NewMisc => {
  return axios.post("/api/misc/update", NewMisc);
};
