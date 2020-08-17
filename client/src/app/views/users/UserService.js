import axios from "axios";

export const getAllUsers = () => {
  return axios.get("/api/users/list");
};
export const getUserById = id => {
  return axios.get(`/api/users/get?uid=${id}`);
};
export const deleteUser = id => {
  return axios.post(`/api/users/delete?uid=${id}`);
};
export const addNewUser = NewUser => {
  return axios.post("/api/users/add", NewUser);
};
export const updateUser = NewUser => {
  return axios.post("/api/users/update", NewUser);
};
