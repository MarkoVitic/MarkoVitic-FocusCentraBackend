import express from "express";
import paymentsControllers from "../controllers/payments-controller";
const paymentsRute = express.Router();

paymentsRute
  .route("/payments")
  .get(paymentsControllers.getAllPayments)
  .post(paymentsControllers.createPayment);
paymentsRute
  .route("/payments/:id")
  .get(paymentsControllers.getPaymentById)
  .delete(paymentsControllers.deletePayment)
  .put(paymentsControllers.updatePayment);

export default paymentsRute;
