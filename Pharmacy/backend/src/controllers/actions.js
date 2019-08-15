import Axios from "axios";
import dotenv from "dotenv/config";
import History from "../models/history";
import uuid from "uuid/v1";
import { createHistory, verifyDrug, getDrug } from "../services/actions";

const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

console.log(A_XX_URL, C_XX_URL);

export async function postAction(req, res) {}

export async function verifyAction(req, res) {}

export async function dispenseAction(req, res) {
  const id = uuid();
  Promise.all([
    createHistory({
      id,
      status: "waiting",
      action: "dispence",
      data: req.body
    }),
    verifyDrug(req.body),
    getDrug(req.body.code)
  ]).then((result)=> {
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })
}

export async function destroyAction(req, res) {}

export async function sampleAction(req, res) {}

export async function undoAction(req, res) {}
