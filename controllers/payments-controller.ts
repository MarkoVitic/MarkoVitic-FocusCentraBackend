import { Request, Response } from "express";
import paymentsService from "../service/payments-service";
import professorsControllers from "./professors-controllers";

// Controller to get all payments
const getAllPayments = async (req: Request, res: Response) => {
  try {
    const result = await paymentsService.getAllPayments();

    if (result.success) {
      res.status(200).json(result); // 200 OK
    } else {
      res.status(500).json(result); // 500 Internal Server Error
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to get a single payment by ID
const getPaymentById = async (req: Request, res: Response) => {
  try {
    const idPlacanje = req.params.id;
    const result = await paymentsService.getPaymentById(Number(idPlacanje));

    if (result.success) {
      res.status(200).json(result); // 200 OK
    } else {
      res.status(404).json(result); // 404 Not Found
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to create a new payment
const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;

    const result = await paymentsService.createPayment(paymentData);

    // Pozivanje f-je za racunanje procenta profesora za trenutni mjesec
    getSumForMonthProfesor(paymentData.idPredmet, paymentData.idProfesor);

    //Pozivanje f-je i razunanje za ukupnu sumu i upisuje u prof tableu
    getSumForProfesor(paymentData.idPredmet, paymentData.idProfesor);

    if (result.success) {
      res.status(201).json(result); // 201 Created
    } else {
      res.status(400).json(result); // 400 Bad Request
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to update an existing payment
const updatePayment = async (req: Request, res: Response) => {
  try {
    const idPlacanje = req.params.id;
    const paymentData = req.body;
    console.log(idPlacanje);
    console.log(paymentData);
    const result = await paymentsService.updatePayment(
      Number(idPlacanje),
      paymentData
    );

    if (result.success) {
      res.status(200).json(result); // 200 OK
    } else {
      res.status(404).json(result); // 404 Not Found
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to delete a payment by ID
const deletePayment = async (req: Request, res: Response) => {
  try {
    const idPlacanje = req.params.id;
    const result = await paymentsService.deletePayment(Number(idPlacanje));

    if (result.success) {
      res.status(200).json(result); // 200 OK
    } else {
      res.status(404).json(result); // 404 Not Found
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getSumForMonthProfesor = async (
  idPredmet: number,
  idProfesor: number
) => {
  try {
    const sumMntfProfesor = await paymentsService.getSumForMonthProfesor(
      idPredmet,
      idProfesor
    );

    professorsControllers.inserIntoMonthPlacanja(
      sumMntfProfesor[0].idProfesor,
      parseInt(sumMntfProfesor[0].prihodMjesecniProfesor)
    );
    console.log(sumMntfProfesor[0].idProfesor);
  } catch (err: any) {
    return {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    };
  }
};
const getSumForProfesor = async (idPredmet: number, idProfesor: number) => {
  try {
    const sumMntfProfesor = await paymentsService.getSumForProfesor(
      idPredmet,
      idProfesor
    );

    professorsControllers.inserAllSumIntoPlacanja(
      sumMntfProfesor[0].idProfesor,
      parseInt(sumMntfProfesor[0].prihodMjesecniProfesor)
    );
    console.log(sumMntfProfesor[0].idProfesor);
  } catch (err: any) {
    return {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    };
  }
};
export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
