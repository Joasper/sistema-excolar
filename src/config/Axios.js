import axios from "axios";

export const BD = axios.create({
  baseURL: "mongodb://localhost:27017/sistemaescolar",
});
