import express from "express";
import studentsControllers from "../controllers/students-controller";
const studetsRute = express.Router();

studetsRute
  .route("/students")
  .get(studentsControllers.getAllStudents)
  .post(studentsControllers.createStudent);
studetsRute
  .route("/students/:id")
  .get(studentsControllers.getStudentById)
  .delete(studentsControllers.deleteStudent)
  .put(studentsControllers.updateStudent);

export default studetsRute;
