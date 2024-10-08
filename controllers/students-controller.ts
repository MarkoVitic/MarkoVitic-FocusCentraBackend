import { Request, Response } from "express";
import studentsService from "../service/students-service";
import globalDateRepository from "../repository/globalDate-repository";

// Controller to get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentsService.getAllStudents();

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

const getAllStudentsWithSubjectName = async (req: Request, res: Response) => {
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;
  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    const result = await studentsService.getAllStudentsWithSubjectName(
      start,
      end
    );

    res.send(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to get a single student by ID
const getStudentById = async (req: Request, res: Response) => {
  try {
    const idUcenik = req.params.id;

    const result = await studentsService.getStudentById(Number(idUcenik));

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

// Controller to create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    let newData = {
      ImePrezimeUcenika: studentData.ImePrezimeUcenika,
      ImeRoditelja: studentData.ImeRoditelja,
      kontaktRoditelja: studentData.kontaktRoditelja,
      emailRoditelja: studentData.emailRoditelja,
      ocjenaJedan: !studentData.ocjenaJedan ? 0 : studentData.ocjenaJedan,
      ocjenaDva: !studentData.ocjenaDva ? 0 : studentData.ocjenaDva,
      ocjenaTri: !studentData.ocjenaTri ? 0 : studentData.ocjenaTri,
      ocjenaCetiri: !studentData.ocjenaCetiri ? 0 : studentData.ocjenaCetiri,

      ukupnoPlacenoDoSada: !studentData.ukupnoPlacenoDoSada
        ? 0
        : studentData.ukupnoPlacenoDoSada,
      popust: !studentData.popust ? 0 : studentData.popust,
      idProfesoriPredmeti: !studentData.idProfesoriPredmeti
        ? 0
        : studentData.idProfesoriPredmeti,
    };

    const result = await studentsService.createStudent(newData);

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

// Controller to update an existing student
const updateStudent = async (req: Request, res: Response) => {
  try {
    const idUcenik = req.params.id;
    const studentData = req.body;

    let newData = {
      ImePrezimeUcenika: studentData.ImePrezimeUcenika,
      ImeRoditelja: studentData.ImeRoditelja,
      kontaktRoditelja: studentData.kontaktRoditelja,
      emailRoditelja: studentData.emailRoditelja,
      ocjenaJedan: !studentData.ocjenaJedan ? 0 : studentData.ocjenaJedan,
      ocjenaDva: !studentData.ocjenaDva ? 0 : studentData.ocjenaDva,
      ocjenaTri: !studentData.ocjenaTri ? 0 : studentData.ocjenaTri,
      ocjenaCetiri: !studentData.ocjenaCetiri ? 0 : studentData.ocjenaCetiri,

      ukupnoPlacenoDoSada: !studentData.ukupnoPlacenoDoSada
        ? 0
        : studentData.ukupnoPlacenoDoSada,
      popust: !studentData.popust ? 0 : studentData.popust,
      idProfesoriPredmeti: !studentData.idProfesoriPredmeti
        ? 0
        : studentData.idProfesoriPredmeti,
    };

    const result = await studentsService.updateStudent(
      Number(idUcenik),
      newData
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

// Controller to delete a student by ID
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const idUcenik = req.params.id;
    const result = await studentsService.deleteStudent(Number(idUcenik));

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

const inertIntoStudentTotalPayments = async (ukupnaSuma: any) => {
  try {
    const sumOfAllStudentPayments =
      await studentsService.inertIntoStudentTotalPayments(ukupnaSuma);
    return sumOfAllStudentPayments;
  } catch (err: any) {
    return err;
  }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsWithSubjectName,
  inertIntoStudentTotalPayments,
};
