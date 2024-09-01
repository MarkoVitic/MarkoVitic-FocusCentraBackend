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

const deleteProfessorSubjectRelation = async (idProfesoriPredmeti: number) => {
  const query = `
    DELETE FROM profesori_predmeti
    WHERE idProfesoriPredmeti = ?
  `;
  const values = [idProfesoriPredmeti];

  try {
    const result = await dbConnection.query(query, values);

    // Check if any rows were affected (i.e., a row was successfully deleted)
    if (result.affectedRows > 0) {
      return { success: true, affectedRows: result.affectedRows };
    } else {
      return { success: false, message: "No matching record found to delete" };
    }
  } catch (err: any) {
    // Handle the error and return a meaningful error message
    throw new Error(
      `Error deleting from professor-subject relation: ${err.message}`
    );
  }
};

export default {
  createProfessorSubjectRelation,
  editProcenatProfessorSubject,
  deleteProfessorSubjectRelation,
};
