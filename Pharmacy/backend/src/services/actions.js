import History from "../models/history";
import Axios from 'axios'
import dotenv from "dotenv/config";
const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

export async function createHistory(options) {
  return History.create({
    ...options
  });
}
export async function verifyDrug(data) {
  const response = await Axios({
    url: `${A_XX_URL}/check`,
    method: "POST",
    data
  });
  console.log(response);
  return true;
}
export async function getDrug(serial_number) {
  return Axios({
    url: `${C_XX_URL}/get-drug/${serial_number}`
  });
}
