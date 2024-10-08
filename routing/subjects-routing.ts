import express from "express";
import subjectsControllers from "../controllers/subjects-controllers";
const subjetsRute = express.Router();

subjetsRute
  .route("/subjets")
  .get(subjectsControllers.getAllSubjects)
  .post(subjectsControllers.createSubject);
subjetsRute
  .route("/subjets/:id")
  .put(subjectsControllers.updateSubject)
  .get(subjectsControllers.getOnlySubject)
  .delete(subjectsControllers.deleteSubject);
subjetsRute
  .route("/subjetsall")
  .get(subjectsControllers.getAllSubjetsWithProfessors);

subjetsRute
  .route("/subjets/:id/:idProfesor")
  .get(subjectsControllers.getSubjectById);

export default subjetsRute;
