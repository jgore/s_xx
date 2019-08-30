import express from "express";
import {
  postAction,
  verifyAction,
  dispenseAction,
  destroyAction,
  sampleAction,
  undoAction
} from "../controllers/actions";

const router = express.Router();

export default () => {
  router.post("/post-action", postAction);
  router.post("/verify", verifyAction);
  router.post("/dispense", dispenseAction);
  router.post("/destroy", destroyAction);
  router.post("/sample", sampleAction);
  router.post("/undo", undoAction);
  return router;
};
