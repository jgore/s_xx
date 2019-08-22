import Axios from "axios";
import dotenv from "dotenv/config";
import History from "../models/history";
import uuid from "uuid/v1";
import { createHistory, verifyDrug, getDrug, getDrugs } from "../services/actions";

const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

console.log(A_XX_URL, C_XX_URL);

export async function postAction(req, res) {}

export async function verifyAction(req, res) {}

export async function dispenseAction(req, res) {
  const id = uuid();
  if(Array.isArray(req.body.serials)) {
    try {
      const result = await Promise.all([
        createHistory({
          id,
          status: "waiting",
          action: "dispence",
          data: req.body
        }),
        getDrugs(req.body.serials),
        verifyDrug(req.body)
      ])
  
      createHistory({
        id,
        status: "done",
        action: "dispence",
        data: {
          referenced: id,
        }
      })
      console.log(result[1].data)
      res.send({products: result[1].data})
    }catch(err){
      console.log(err)
      createHistory({
        id,
        status: "rejected",
        action: "dispence",
        data: {
          referenced: id,
        }
      })
      return res.status(400).send({})
    }
    
  }else {
    try {
      const result = await Promise.all([
        createHistory({
          id,
          status: "waiting",
          action: "dispence",
          data: req.body
        }),
        getDrug(req.body.serial),
        verifyDrug(req.body)
      ])
  
      createHistory({
        id,
        status: "done",
        action: "dispence",
        data: {
          referenced: id,
        }
      })
      res.send({products: result[1].data})
    }catch(err) {
      createHistory({
        id,
        status: "rejected",
        action: "dispence",
        data: {
          referenced: id,
        }
      })
      return res.status(400).send({})
    }
  }
  
  
}

export async function destroyAction(req, res) {}

export async function sampleAction(req, res) {}

export async function undoAction(req, res) {}
