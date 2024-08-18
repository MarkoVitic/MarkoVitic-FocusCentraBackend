import { dbConnection } from "../common/db-conection";

const getAllProfessors = async () => {
  try {
    const allProfessors = await dbConnection.query(`SELECT * FROM profesori`);
    return allProfessors;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getProfessorById = async (idProfesor: number) => {
  try {
    const professor = await dbConnection.query(
      `SELECT * FROM profesori WHERE idProfesor = ?`,
      [idProfesor]
    );
    if (professor.length > 0) {
      return professor[0];
    } else {
      return { success: false, msg: "Professor not found" };
    }
  } catch (err) {
    return { success: false, msg: err };
  }
};

//Get all profesors with Subjcet
const getAllProfessorsWithSubjects = async () => {
  try {
    const query = await dbConnection.query(`
      SELECT 
        p.idProfesor,
        p.ImePrezimeProfesor,
        p.kontaktProfesor,
        p.emailProfesor,
        p.adresaProfesor,
        p.procenatProfesor,
        p.prihodMjesecniProfesor,
        p.prihodUkupni,
        pr.idPredmet,
        pr.nazivPredmeta
      FROM 
        profesori p
      LEFT JOIN 
        predmeti pr
      ON
        p.idProfesor =pr.idProfesor;
    `);
    return query;
  } catch (err: any) {
    return err;
  }
};

// Function to create a new professor
const createProfessor = async (professorData: any) => {
  const {
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,
    procenatProfesor,
  } = professorData;

  const query = `
    INSERT INTO profesori 
    (ImePrezimeProfesor, kontaktProfesor, emailProfesor, adresaProfesor, procenatProfesor, kreirano, azurirano) 
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const values = [
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,
    procenatProfesor,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Returns the ID of the newly inserted professor
  } catch (err: any) {
    throw new Error(`Error creating professor: ${err.message}`);
  }
};

// Function to update an existing professor
const updateProfessor = async (idProfessor: number, professorData: any) => {
  const {
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,
    procenatProfesor,
  } = professorData;

  const query = `
    UPDATE profesori 
    SET 
      ImePrezimeProfesor = ?, 
      kontaktProfesor = ?, 
      emailProfesor = ?, 
      adresaProfesor = ?, 
      procenatProfesor = ?, 
      
      azurirano = CURRENT_TIMESTAMP
    WHERE idProfesor = ?
  `;

  const values = [
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,
    procenatProfesor,

    idProfessor,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.affectedRows; // Returns the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error updating professor: ${err.message}`);
  }
};

// Function to delete a professor by ID
const deleteProfessor = async (idProfessor: number) => {
  const query = `DELETE FROM profesori WHERE idProfesor = ?`;

  try {
    const result = await dbConnection.query(query, [idProfessor]);
    return result.affectedRows; // Returns the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error deleting professor: ${err.message}`);
  }
};

export default {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getAllProfessorsWithSubjects,
};
