import { dbConnection } from "../common/db-conection";

const createProfessorSubjectRelation = async (professorSubjectData: any) => {
  const { idProfesor, idPredmet, procenat, mjesecniPrihod, ukupniPrihod } =
    professorSubjectData;

  const query = `
        INSERT INTO profesori_predmeti (idProfesor, idPredmet, procenat, mjesecniPrihod, ukupniPrihod, kreirano, azurirano)
        VALUES (?,?,?, ?, ?,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

  const values = [
    idProfesor,
    idPredmet,
    procenat,
    mjesecniPrihod,
    ukupniPrihod,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result;
  } catch (err: any) {
    throw new Error(
      `Error creating professor-subject relation: ${err.message}`
    );
  }
};

export default {
  createProfessorSubjectRelation,
};
