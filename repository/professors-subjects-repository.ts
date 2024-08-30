import { dbConnection } from "../common/db-conection";

const createProfessorSubjectRelation = async (professorSubjectData: any) => {
  const { idProfesor, idPredmet, procenat, mjesecniPrihod, ukupniPrihod } =
    professorSubjectData;

  const query = `
        INSERT INTO profesori_predmeti (idProfesor, idPredmet, procenat, kreirano, azurirano)
        VALUES (?,?,?,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

  const values = [idProfesor, idPredmet, procenat];

  try {
    const result = await dbConnection.query(query, values);
    return result;
  } catch (err: any) {
    throw new Error(
      `Error creating professor-subject relation: ${err.message}`
    );
  }
};

const editProcenatProfessorSubject = async (
  idProfessor: number,
  idSubject: number,
  procent: number
) => {
  const query = `
  UPDATE profesori_predmeti
  SET procenat=?,
  azurirano = CURRENT_TIMESTAMP
  WHERE idProfesor =? AND idPredmet=?`;
  const value = [procent, idProfessor, idSubject];
  try {
    const result = await dbConnection.query(query, value);
    return result;
  } catch (err: any) {
    throw new Error(`Error editing professor-subject relation: ${err.message}`);
  }
};

const deleteProfessorSubjectRelation = async (
  idProfesor: number,
  idSubject: number
) => {
  const quer = `DELETE FROM profesori_predmeti
  WHERE idProfesor = ? AND idPredmet = ?
  `;
  const value = [idProfesor, idSubject];
  try {
    const result = await dbConnection.query(quer, value);
    return result.affectedRows;
  } catch (err: any) {
    throw new Error(
      `Error deliting from professor-subject relation: ${err.message}`
    );
  }
};

export default {
  createProfessorSubjectRelation,
  editProcenatProfessorSubject,
  deleteProfessorSubjectRelation,
};
