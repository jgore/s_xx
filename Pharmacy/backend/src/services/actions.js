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
  return Axios({
    url: `${A_XX_URL}/check`,
    method: "POST",
    data
  });
}
export async function getDrug(serial, data) {
  return Axios({
    url: `${C_XX_URL}/products/get-drug/${serial}`,
    method: "POST",
    data
  });
}

export async function getDrugs(serials) {
  return Axios({
    url: `${C_XX_URL}/products/get-drugs`,
    method: "POST",
    data: {serials}
  })
}
 