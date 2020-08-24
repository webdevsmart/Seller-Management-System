import axios from "axios";

export const getSalesOutletReport = (data) => {
  return axios.post(`/api/sales-outlet-report/get`, data);
};
export const addNewSalesOutletReport = NewSalesOutletReport => {
  return axios.post("/api/sales-outlet-report/add", NewSalesOutletReport);
};
export const updateSalesOutletReport = NewSalesOutletReport => {
  return axios.post("/api/sales-outlet-report/update", NewSalesOutletReport);
};
