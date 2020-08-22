import axios from "axios";

export const getAllLocations = () => {
  return axios.get("/api/inventory-warehouse-location/list");
};
export const getLocationById = id => {
  return axios.get(`/api/inventory-warehouse-location/get?uid=${id}`);
};
export const deleteLocation = id => {
  return axios.post(`/api/inventory-warehouse-location/delete?uid=${id}`);
};
export const addNewLocation = NewLocation => {
  return axios.post("/api/inventory-warehouse-location/add", NewLocation);
};
export const updateLocation = NewLocation => {
  return axios.post("/api/inventory-warehouse-location/update", NewLocation);
};
export const getLocationNameList = () => {
  return axios.get("/api/inventory-warehouse-location/name-list");
};
export const getLocationLocationList = data => {
  return axios.post("/api/inventory-warehouse-location/location-list", data);
};

