import express from "express";
import paymentsControllers from "../controllers/payments-controller";
const paymentsRute = express.Router();

paymentsRute.route("/payments").post(paymentsControllers.createPayment);

paymentsRute
  .route("/payments/:id")
  .get(paymentsControllers.getPaymentById)
  .put(paymentsControllers.updatePayment);

paymentsRute
  .route("/payments/:id/:idProfPred/:idUcenik")
  .delete(paymentsControllers.deletePayment);

paymentsRute
  .route("/payments/:startDate/:endDate")
  .get(paymentsControllers.getAllPayments);

export default paymentsRute;
