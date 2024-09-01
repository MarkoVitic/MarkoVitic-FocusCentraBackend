import express from "express";
import professorsControllers from "../controllers/professors-controllers";

const profesoriRute = express.Router();

profesoriRute
  .route("/professors")
  .get(professorsControllers.getAllProfessors)
  .post(professorsControllers.createProfessor);
profesoriRute
  .route("/professors/:id")
  .put(professorsControllers.updateProfessor)
  .delete(professorsControllers.deleteProfessor);

profesoriRute
  .route("/professorsall")
  .get(professorsControllers.getAllProfessorsWithSubjects);

profesoriRute
  .route("/professors/:idPredemt/:idProfesor")
  .get(professorsControllers.getProfessorById);

profesoriRute
  .route("/professorstable")
  .get(professorsControllers.getAllProfesorsFromProfessorsTable);

export default profesoriRute;
