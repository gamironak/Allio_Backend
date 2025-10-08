import express from "express";
import {
  addUserToGetStream,
  getTokenToGetStream,
} from "../Controllers/getstream.controller.js";

const router = express.Router();

router.post("/add-user-getstream", addUserToGetStream);
router.post("/get-token", getTokenToGetStream);

export default router;
