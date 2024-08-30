import professorSubjectService from "../service/professor-subject-service";
import { Request, Response } from "express";

const createProfessorSubjectRelation = async (req: Request, res: Response) => {
  try {
    const professorSubjectData = req.body;
    const data = await professorSubjectService.createProfessorSubjectRelation(
      professorSubjectData
    );
    console.log(data);
    return res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const editProcenatProfessorSubject = async (req: Request, res: Response) => {
  try {
    const { idProfessor, idSubject, procent } = req.body;
    const data = await professorSubjectService.editProcenatProfessorSubject(
      parseInt(idProfessor),
      parseInt(idSubject),
      parseInt(procent)
    );
    return res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default { createProfessorSubjectRelation, editProcenatProfessorSubject };
