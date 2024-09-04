import express from "express";
import globalDateControllers from "../controllers/globalDate-controllers";

const globalDateRouting = express.Router();

globalDateRouting
  .route("/globalDate")
  .post(globalDateControllers.createDate)
  .get(globalDateControllers.getAllDates);

globalDateRouting
  .route("/globalDate/:id")
  .put(globalDateControllers.updateDate)
  .delete(globalDateControllers.deleteDate);

export default globalDateRouting;
