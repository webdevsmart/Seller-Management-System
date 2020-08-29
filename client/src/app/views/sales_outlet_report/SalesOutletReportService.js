import axios from "axios";

export const addNewSalesOutletReport = NewSalesOutletReport => {
  return axios.post("/api/sales-outlet-report/add", NewSalesOutletReport);
};
export const updateSalesOutletReport = data => {
  return axios.post("/api/sales-outlet-report/update", data);
};
export const getSalesReportById = id => {
  return axios.get("/api/sales-outlet-report/get?_id=" + id)
}