import express from "express";
import {getDrug} from '../controllers/products'

const router = express.Router();

export default () => {
  router.post("/get-drug", getDrug)
  return router
};
