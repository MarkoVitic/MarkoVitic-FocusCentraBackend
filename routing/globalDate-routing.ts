import express from "express";
import globalDateControllers from "../controllers/globalDate-controllers";

const globalDateRouting = express.Router();

globalDateRouting.route("/globalDate").post(globalDateControllers.createDate);

globalDateRouting
  .route("/globalDate/:id")
  .put(globalDateControllers.updateDate)
  .delete(globalDateControllers.deleteDate);

export default globalDateRouting;
