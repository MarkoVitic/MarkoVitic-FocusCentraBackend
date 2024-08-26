import { Response, Request } from "express";
import professorsService from "../service/professors-service";

const getAllProfessors = async (req: Request, res: Response) => {
  const allProfessors = await professorsService.getAllProfessors();
  res.send(allProfessors);
};

//Get All professors with Subjects
const getAllProfessorsWithSubjects = async (req: Request, res: Response) => {
  const allProfessros = await professorsService.getAllProfessorsWithSubjects();

  res.send(allProfessros);
};

const getProfessorById = async (req: Request, res: Response) => {
  try {
    const idProfesor = req.params.id;
    const professor = await professorsService.getProfessorById(
      parseInt(idProfesor)
    );

    if (professor) {
      res.status(200).send(professor);
    } else {
      res.status(404).send({ success: false, msg: "Professor not found" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, msg: "Internal Server Error", error: err });
  }
};

// create a new professor
const createProfessor = async (req: Request, res: Response) => {
  try {
    const professorData: any = req.body;
    console.log(professorData);
    const result = await professorsService.createProfessor(professorData);

    if (result.success) {
      res.status(201).send(result); // 201 Created
    } else {
      res.status(400).send(result); // 400 Bad Request
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// update an existing professor
const updateProfessor = async (req: Request, res: Response) => {
  try {
    const idProfessor = req.params.id;
    const professorData = req.body;

    const result = await professorsService.updateProfessor(
      parseInt(idProfessor),
      professorData
    );

    if (result.success) {
      res.status(200).send(result); // 200 OK
    } else {
      res.status(404).send(result); // 404 Not Found or No Changes Made
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// delete a professor by ID
const deleteProfessor = async (req: Request, res: Response) => {
  try {
    const idProfessor = req.params.id; // Extract the professor ID from the request parameters
    const result = await professorsService.deleteProfessor(
      parseInt(idProfessor)
    );

    if (result.success) {
      res.status(200).send(result); // 200 OK
    } else {
      res.status(404).send(result); // 404 Not Found
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const inserIntoMonthPlacanja = async (
  idProfesor: number,
  mjescniPrihod: number
) => {
  try {
    const data = await professorsService.inserIntoMonthPlacanja(
      idProfesor,
      mjescniPrihod
    );

    return data;
  } catch (err: any) {
    return err;
  }
};
const inserAllSumIntoPlacanja = async (
  idProfesor: number,
  ukupniPrihod: number
) => {
  try {
    const data = await professorsService.inserAllSumIntoPlacanja(
      idProfesor,
      ukupniPrihod
    );

    return data;
  } catch (err: any) {
    return err;
  }
};

const inserIntoProfesoriIdSubject = async (
  idPredmet: number,
  idProfesor: number
) => {
  try {
    const data = await professorsService.inserIntoProfesoriIdSubject(
      idPredmet,
      idProfesor
    );

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Cannot add subjet to table profesori: ${err.message}`,
    };
  }
};

export default {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getAllProfessorsWithSubjects,
  inserIntoMonthPlacanja,
  inserAllSumIntoPlacanja,
  inserIntoProfesoriIdSubject,
};
