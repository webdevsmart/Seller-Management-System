import axios from "axios";

export const getCompiledReport = (data) => {
  return axios.post("/api/inventory-forecast/report", data);
};