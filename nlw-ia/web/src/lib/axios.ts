import axios from "axios";

const isDevEnvironment = import.meta.env.DEV;

export const api = axios.create({
  baseURL: isDevEnvironment ? 'http://localhost:3333' : import.meta.env.API_URL
})
