import express from "express";
import subjectsControllers from "../controllers/subjects-controllers";
const subjetsRute = express.Router();

subjetsRute
  .route("/subjets")
  .get(subjectsControllers.getAllSubjects)
  .post(subjectsControllers.createSubject);
subjetsRute
  .route("/subjets/:id")
  .get(subjectsControllers.getSubjectById)
  .delete(subjectsControllers.deleteSubject)
  .put(subjectsControllers.updateSubject);
subjetsRute
  .route("/subjetsall")
  .get(subjectsControllers.getAllSubjetsWithProfessors);

export default subjetsRute;
