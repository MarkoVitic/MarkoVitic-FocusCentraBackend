import { Request, Response } from "express";
import subjectService from "../service/subjects-service";
import professorsControllers from "./professors-controllers";
import professorSubjectService from "../service/professor-subject-service";

// Controller to get all subjects
const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const result = await subjectService.getAllSubjects();

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

const getAllSubjetsWithProfessors = async (req: Request, res: Response) => {
  try {
    const result = await subjectService.getAllSubjetsWithProfessors();
    res.send(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to get a single subject by ID
const getSubjectById = async (req: Request, res: Response) => {
  try {
    const idPredmet = req.params.id;
    const idProfesor = req.params.professorId;
    const result = await subjectService.getSubjectById(
      Number(idPredmet),
      Number(idProfesor)
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

const getOnlySubject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await subjectService.getOnlySubject(parseInt(id));
    console.log(data);
    return data;
  } catch (err: any) {
    throw new Error(`Error retrieving subject by ID: ${err.message}`);
  }
};

// Controller to create a new subject
const createSubject = async (req: Request, res: Response) => {
  const subjectData = req.body;
  try {
    const result = await subjectService.createSubject(subjectData);

    res.status(200).json(result); // 200 OK
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Controller to update an existing subject
const updateSubject = async (req: Request, res: Response) => {
  try {
    const idPredmett = req.params.id;
    const subjectData = req.body;

    const result = await subjectService.updateSubject(
      Number(idPredmett),
      subjectData
    );

    const { idProfesor, idPredmet, procenat } = subjectData;

    await professorSubjectService.editProcenatProfessorSubject(
      idProfesor,
      idPredmet,
      procenat
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

// Controller to delete a subject by ID
const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id, idProfesor } = req.params;
    console.log(id, idProfesor);
    const deleteFromProfessorSubject =
      await professorSubjectService.deleteProfessorSubjectRelation(
        parseInt(idProfesor),
        parseInt(id)
      );
    if (deleteFromProfessorSubject) {
      const result = await subjectService.deleteSubject(Number(id));

      if (result.success) {
        res.status(200).json(result); // 200 OK
      } else {
        res.status(404).json(result); // 404 Not Found
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjetsWithProfessors,
  getOnlySubject,
};
