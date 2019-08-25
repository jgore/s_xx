import express from "express";
import {verfiyDrug} from '../controllers/products'

const router = express.Router();

export default () => {
  router.post("/verfiy", verfiyDrug)
  return router
};
