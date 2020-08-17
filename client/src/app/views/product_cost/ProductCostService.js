import axios from "axios";

export const getAllProductCostList = () => {
  return axios.get("/api/products/cost-list");
};