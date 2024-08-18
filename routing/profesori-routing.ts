import express from "express";
import professorsControllers from "../controllers/professors-controllers";

const profesoriRute = express.Router();

profesoriRute
  .route("/professors")
  .get(professorsControllers.getAllProfessors)
  .post(professorsControllers.createProfessor);
profesoriRute
  .route("/professors/:id")
  .get(professorsControllers.getProfessorById)
  .put(professorsControllers.updateProfessor)
  .delete(professorsControllers.deleteProfessor);
profesoriRute
  .route("/professorsall")
  .get(professorsControllers.getAllProfessorsWithSubjects);

export default profesoriRute;
