import { Request, Response } from "express";
import paymentsService from "../service/payments-service";
import professorsControllers from "./professors-controllers";
import studentsController from "./students-controller";

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
    getSumForMonthProfesor(paymentData.idProfesoriPredmeti);

    //Pozivanje f-je i razunanje za ukupnu sumu i upisuje u profPredemt tableu

    getSumForProfesor(paymentData.idProfesoriPredmeti);

    //Pozivanje f-je za racunaje svih upalta Ucenika Za odgovarajuci predmet
    getSumForStudentPayments(
      paymentData.idUcenik,
      paymentData.idProfesoriPredmeti
    );

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

const getSumForMonthProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const sumMntfProfesor = await paymentsService.getSumForMonthProfesor(
      idProfesoriPredmeti
    );

    professorsControllers.inserIntoMonthPlacanja(
      sumMntfProfesor[0].idProfesoriPredmeti,
      parseInt(sumMntfProfesor[0].prihodMjesecniProfesor)
    );
  } catch (err: any) {
    return {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    };
  }
};
const getSumForProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const sumMntfProfesor = await paymentsService.getSumForProfesor(
      idProfesoriPredmeti
    );

    professorsControllers.inserAllSumIntoPlacanja(
      sumMntfProfesor[0].idProfesoriPredmeti,
      parseInt(sumMntfProfesor[0].prihodMjesecniProfesor)
    );
  } catch (err: any) {
    return {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    };
  }
};

const getSumForStudentPayments = async (
  idUcenik: number,
  idProfesoriPredmeti: number
) => {
  try {
    const sumForStudentPayments =
      await paymentsService.getSumForStudentPayments(
        idUcenik,
        idProfesoriPredmeti
      );

    return studentsController.inertIntoStudentTotalPayments(
      sumForStudentPayments[0]
    );
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
