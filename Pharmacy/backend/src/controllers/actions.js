import Axios from "axios";
import dotenv from "dotenv/config";
import History from "../models/history";
import uuid from "uuid/v1";
import { createHistory, verifyDrug, getDrugs } from "../services/actions";

const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

console.log(A_XX_URL, C_XX_URL);

export async function postAction(req, res) {}

export async function verifyAction(req, res) {
  const id = uuid();
  const action = "verify";
  let result;
  try {
    result = await Promise.all([
      createHistory({
        id,
        status: "waiting",
        action,
        data: req.body
      }),
      getDrugs(req.body),
      verifyDrug(req.body)
    ]);
  } catch (err) {
    return res.status(400).send({});
  }

  createHistory({
    id,
    status: "done",
    action,
    data: {
      referenced: id
    }
  });
  res.send({ products: result[1].data });
}

export async function dispenseAction(req, res) {}

export async function destroyAction(req, res) {}

export async function sampleAction(req, res) {}

export async function undoAction(req, res) {}
