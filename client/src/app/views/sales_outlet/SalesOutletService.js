import axios from "axios";

export const getAllSalesOutlets = () => {
  return axios.get("/api/sales-outlet/list");
};
export const getSalesOutletById = id => {
  return axios.get(`/api/sales-outlet/get?uid=${id}`);
};
export const deleteSalesOutlet = id => {
  return axios.post(`/api/sales-outlet/delete?uid=${id}`);
};
export const addNewSalesOutlet = NewSalesOutlet => {
  return axios.post("/api/sales-outlet/add", NewSalesOutlet);
};
export const updateSalesOutlet = NewSalesOutlet => {
  return axios.post("/api/sales-outlet/update", NewSalesOutlet);
};
export const getSalesOutletNameList = () => {
  return axios.get("/api/sales-outlet/name-list");
}
export const getSalesOutletLocationListByName = name => {
  return axios.post("/api/sales-outlet/location-list-by-id", name);
}