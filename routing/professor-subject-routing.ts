import express from "express";
import professorSubjectController from "../controllers/professor-subject-controller";

const professorSubjectRouting = express.Router();

professorSubjectRouting
  .route("/professorSubject")
  .post(professorSubjectController.createProfessorSubjectRelation);

professorSubjectRouting
  .route("/professorSubjects/:idProfesoriPredmeti")
  .delete(professorSubjectController.deleteProfessorSubjectRelation);

export default professorSubjectRouting;
