import express from "express";
import {getDrug, getDrugs} from '../controllers/products'

const router = express.Router();

export default () => {
  router.post("/get-drug/:serial", getDrug)
  router.post("/get-drugs", getDrugs)
  return router
};
