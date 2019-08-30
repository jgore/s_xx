import Axios from "axios";
import dotenv from "dotenv/config";
import Product from "../models/products";
import uuid from "uuid/v1";
import { createHistory, verifyDrug, getDrugs } from "../services/actions";

const C_XX_URL = process.env.C_XX_URL,
  A_XX_URL = process.env.A_XX_URL;

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
    createHistory({
      id,
      status: "rejected",
      action,
      err
    });
    return res.status(400).send({});
  }

  createHistory({
    id,
    status: "done",
    action,
    data: result[1].data
  });
  res.send({ products: result[1].data });
}

export async function dispenseAction(req, res) {
  const id = uuid();
  const action = "dispense";
  let result;
  let updateStats
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

    updateStats = await Product.update(
      {},
      { $pull: { serials: { $in: req.body } } },
      { multi: true }
    );
  } catch (err) {
    createHistory({
      id,
      status: "rejected",
      action,   
      err
    })
    return res.status(400).send({});
  }
  
  await createHistory({
    id,
    status: "done",
    action,
    data: updateStats
  });

  res.send({});
}

export async function destroyAction(req, res) {
  const id = uuid();
  const action = "destroy";
  let result;
  let updateStats
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

    updateStats = await Product.update(
      {},
      { $pull: { serials: { $in: req.body } } },
      { multi: true }
    );
  } catch (err) {
    createHistory({
      id,
      status: "rejected",
      action,   
      err
    })
    return res.status(400).send({});
  }
  
  await createHistory({
    id,
    status: "done",
    action,
    data: updateStats
  });

  res.send({});
}

export async function sampleAction(req, res) {
  const id = uuid();
  const action = "sample";
  let result;
  let updateStats
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

    updateStats = await Product.update(
      {},
      { $pull: { serials: { $in: req.body } } },
      { multi: true }
    );
  } catch (err) {
    createHistory({
      id,
      status: "rejected",
      action,   
      err
    })
    return res.status(400).send({});
  }
  
  await createHistory({
    id,
    status: "done",
    action,
    data: updateStats
  });

  res.send({});
}

export async function undoAction(req, res) {

}
