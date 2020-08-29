import axios from "axios";

export const getReportList = () => {
  return axios.get("/api/reports/list");
};
export const deleteReport = (id) => {
  return axios.post("/api/reports/delete?id=" + id);
}