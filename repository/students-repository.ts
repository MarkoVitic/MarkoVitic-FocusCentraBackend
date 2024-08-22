import { dbConnection } from "../common/db-conection"; // Import your database connection module

// Function to get all students
const getAllStudents = async () => {
  const query = "SELECT * FROM ucenici";

  try {
    const students = await dbConnection.query(query);
    return students; // Return all records
  } catch (err: any) {
    throw new Error(`Error retrieving students: ${err.message}`);
  }
};

const getAllStudentsWithSubjectName = async () => {
  try {
    const query = await dbConnection.query(`
      SELECT 
        u.idUcenik,
        u.ImePrezimeUcenika,
        u.ocjenaJedan,
        u.ocjenaDva,
        u.ocjenaTri,
        u.ocjenaCetiri,
        u.ukupnoPlacenoDoSada,
        u.idPredmet,
        u.popust,
         pr.nazivPredmeta,
           pr.ukupnaCijenaPrograma
       
         
       
        
      FROM 
        ucenici u
      LEFT JOIN 
        predmeti pr
      ON
        pr.idPredmet =u.idPredmet;
    `);
    return query;
  } catch (err: any) {
    return err;
  }
};

// Function to get a single student by ID
const getStudentById = async (idUcenik: number) => {
  const query = "SELECT * FROM ucenici WHERE idUcenik = ?";

  try {
    const student = await dbConnection.query(query, [idUcenik]);
    return student; // Return the first record if found
  } catch (err: any) {
    throw new Error(`Error retrieving student by ID: ${err.message}`);
  }
};

// Function to create a new student
const createStudent = async (studentData: any) => {
  const {
    ImePrezimeUcenika,
    ImeRoditelja,
    kontaktRoditelja,
    emailRoditelja,
    ocjenaJedan,
    ocjenaDva,
    ocjenaTri,
    ocjenaCetiri,
    idPredmet,
    ukupnoPlacenoDoSada,
    popust,
  } = studentData;

  const query = `
    INSERT INTO ucenici 
    (ImePrezimeUcenika, ImeRoditelja, kontaktRoditelja, emailRoditelja, ocjenaJedan, ocjenaDva, ocjenaTri, ocjenaCetiri, idPredmet, ukupnoPlacenoDoSada,popust,kreirano, azurirano) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
  `;

  const values = [
    ImePrezimeUcenika,
    ImeRoditelja,
    kontaktRoditelja,
    emailRoditelja,
    ocjenaJedan,
    ocjenaDva,
    ocjenaTri,
    ocjenaCetiri,
    idPredmet,
    ukupnoPlacenoDoSada,
    popust,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (err: any) {
    throw new Error(`Error creating student: ${err.message}`);
  }
};

// Function to update an existing student
const updateStudent = async (idUcenik: number, studentData: any) => {
  const {
    ImePrezimeUcenika,
    ImeRoditelja,
    kontaktRoditelja,
    emailRoditelja,
    ocjenaJedan,
    ocjenaDva,
    ocjenaTri,
    ocjenaCetiri,
    idPredmet,
    ukupnoPlacenoDoSada,
    popust,
  } = studentData;

  const query = `
    UPDATE ucenici 
    SET 
      ImePrezimeUcenika = ?, 
      ImeRoditelja = ?, 
      kontaktRoditelja = ?, 
      emailRoditelja = ?, 
      ocjenaJedan = ?, 
      ocjenaDva = ?, 
      ocjenaTri = ?, 
      ocjenaCetiri = ?, 
      idPredmet = ?, 
      ukupnoPlacenoDoSada = ?, 
      popust = ?,
      azurirano = CURRENT_TIMESTAMP
    WHERE idUcenik = ?
  `;

  const values = [
    ImePrezimeUcenika,
    ImeRoditelja,
    kontaktRoditelja,
    emailRoditelja,
    ocjenaJedan,
    ocjenaDva,
    ocjenaTri,
    ocjenaCetiri,
    idPredmet,
    ukupnoPlacenoDoSada,
    popust,
    idUcenik,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error updating student: ${err.message}`);
  }
};

// Function to delete a student by ID
const deleteStudent = async (idUcenik: number) => {
  const query = "DELETE FROM ucenici WHERE idUcenik = ?";

  try {
    const result = await dbConnection.query(query, [idUcenik]);
    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error deleting student: ${err.message}`);
  }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsWithSubjectName,
};
