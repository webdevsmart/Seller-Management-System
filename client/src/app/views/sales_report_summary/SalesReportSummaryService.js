import axios from "axios";

export const getSalesReportSummary = (data) => {
  return axios.post(`/api/sales-report-summary/get`, data);
};