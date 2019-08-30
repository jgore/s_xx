import History from "../models/history";
import Axios from "axios";
import dotenv from "dotenv/config";
const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

export async function createHistory(options) {
  if (options.err && typeof options.err === "object") {
    options.err = JSON.stringify(options.err);
  }
  if(options.data && typeof options.data === "object"){
    options.data = JSON.stringify(options.data)
  }
  return History.create(options)
}
export async function verifyDrug(data) {
  return Axios({
    url: `${A_XX_URL}/check`,
    method: "POST",
    data
  });
}
export async function getDrugs(data) {
  return Axios({
    url: `${C_XX_URL}/products/verfiy`,
    method: "POST",
    data: {
      serials: data
    }
  });
}
