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
     SELECT 
        pr.idPredmet,
        pr.nazivPredmeta,
        pr.cijenaPrograma,
        pr.popustPrograma,
        pr.ukupnaCijenaPrograma,
        pr.kreirano,
        pr.azurirano,
        pr.idProfesor,
         p.ImePrezimeProfesor
       
        
      FROM 
        profesori p
      RIGHT JOIN 
        predmeti pr
      ON
        p.idProfesor =pr.idProfesor;
    `);
    return query;
  } catch (err: any) {
    return err;
  }
};

// Function to get a single subject by ID
const getSubjectById = async (idPredmet: number) => {
  const query = "SELECT * FROM predmeti WHERE idPredmet = ?";

  try {
    const subject = await dbConnection.query(query, [idPredmet]);
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
    idProfesor,
  } = subjectData;

  const query = `
    INSERT INTO predmeti 
    (nazivPredmeta, cijenaPrograma, popustPrograma, ukupnaCijenaPrograma, idProfesor) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,
    idProfesor,
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
    idProfesor,
  } = subjectData;

  const query = `
    UPDATE predmeti 
    SET 
      nazivPredmeta = ?, 
      cijenaPrograma = ?, 
      popustPrograma = ?, 
      ukupnaCijenaPrograma = ?, 
      idProfesor = ?, 
      azurirano = CURRENT_TIMESTAMP
    WHERE idPredmet = ?
  `;

  const values = [
    nazivPredmeta,
    cijenaPrograma,
    popustPrograma,
    ukupnaCijenaPrograma,
    idProfesor,
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
