import axios from "axios";
import getConfig from 'next/config'
//const { publicRuntimeConfig: config } = getConfig()

export const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});