import axios from "axios";

export const getAllLocationTypes = () => {
  return axios.get("/api/warehouse-location-type/list");
};
export const getLocationTypeById = id => {
  return axios.get(`/api/warehouse-location-type/get?uid=${id}`);
};
export const deleteLocationType = id => {
  return axios.post(`/api/warehouse-location-type/delete?uid=${id}`);
};
export const addNewLocationType = NewLocationType => {
  return axios.post("/api/warehouse-location-type/add", NewLocationType);
};
export const updateLocationType = NewLocationType => {
  return axios.post("/api/warehouse-location-type/update", NewLocationType);
};
