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

const deleteProfessorSubjectRelation = async (req: Request, res: Response) => {
  const id = req.params.idProfesoriPredmeti;
  console.log(id + "-------------------");

  try {
    // Call the service to delete the professor-subject relation
    const data = await professorSubjectService.deleteProfessorSubjectRelation(
      parseInt(id)
    );

    // Check if deletion was successful
    if (data.success) {
      return res.status(200).json({
        success: true,
        message: `Professor-subject relation with ID ${id} deleted successfully`,
        affectedRows: data.affectedRows,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `No professor-subject relation found with ID ${id}`,
      });
    }
  } catch (err: any) {
    // Handle any server errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default {
  createProfessorSubjectRelation,
  editProcenatProfessorSubject,
  deleteProfessorSubjectRelation,
};
