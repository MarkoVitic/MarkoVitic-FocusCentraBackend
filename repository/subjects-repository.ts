import { dbConnection } from "../common/db-conection"; // Import your database connection module

// Function to get all subjects
const getAllSubjects = async () => {
  const query = "SELECT * FROM predmeti";

  try {
    const subjects = await dbConnection.query(query);
    return subjects; // Return all records
  } catch (err: any) {
    throw new Error(`Error retrieving subjects: ${err.message}`);
  }
};

//Get all Subjects with Professors
const getAllSubjetsWithProfessors = async () => {
  try {
    const query = await dbConnection.query(`
    SELECT  pred.*, p.idProfesor,p.ImePrezimeProfesor
    FROM predmeti pred
    LEFT JOIN profesori_predmeti pp ON pp.idPredmet = pred.idPredmet
    LEFT JOIN profesori p ON pp.idProfesor = p.idProfesor;
    `);
    return query;
  } catch (err: any) {
    return err;
  }
};

// Function to get a single subject by ID
const getSubjectById = async (idPredmet: number, idProfesor: number) => {
  const query = `
    SELECT  pred.*, p.idProfesor,p.ImePrezimeProfesor,pp.procenat
    FROM predmeti pred
    LEFT JOIN profesori_predmeti pp ON pp.idPredmet = pred.idPredmet
    LEFT JOIN profesori p ON pp.idProfesor = p.idProfesor
    WHERE pred.idPredmet=? and p.idProfesor=?
    `;

  const value = [idPredmet, idProfesor];

  try {
    const subject = await dbConnection.query(query, value);
    return subject; // Return the first record if found
  } catch (err: any) {
    throw new Error(`Error retrieving subject by ID: ${err.message}`);
  }
};

// Function to create a new subject
const createSubject = async (subjectData: any) => {
  const {
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,
  } = subjectData;

  console.log(
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma
  );
  const query = `
    INSERT INTO predmeti 
    (nazivPredmeta, cijenaPrograma, popustPrograma, ukupnaCijenaPrograma ) 
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (err: any) {
    throw new Error(`Error creating subject: ${err.message}`);
  }
};

// Function to update an existing subject
const updateSubject = async (idPredmet: number, subjectData: any) => {
  const {
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,
  } = subjectData;

  const query = `
    UPDATE predmeti 
    SET 
      nazivPredmeta = ?, 
      cijenaPrograma = ?, 
      popustPrograma = ?, 
      ukupnaCijenaPrograma = ?, 
      
      azurirano = CURRENT_TIMESTAMP
    WHERE idPredmet = ?
  `;

  const values = [
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,

    idPredmet,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error updating subject: ${err.message}`);
  }
};

// Function to delete a subject by ID
const deleteSubject = async (idPredmet: number) => {
  const query = "DELETE FROM predmeti WHERE idPredmet = ?";

  try {
    const result = await dbConnection.query(query, [idPredmet]);
    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error deleting subject: ${err.message}`);
  }
};

export default {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjetsWithProfessors,
};
