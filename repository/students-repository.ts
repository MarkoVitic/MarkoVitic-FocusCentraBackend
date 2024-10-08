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

const getAllStudentsWithSubjectName = async (
  startDate: Date,
  endDate: Date
) => {
  // Format the dates to YYYY-MM-DD format (removing the time and Z part)
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  try {
    const query = await dbConnection.query(
      `
       SELECT u.*, pp.idProfesoriPredmeti, pp.idPredmet, pp.idProfesor, 
              p.nazivPredmeta, prof.ImePrezimeProfesor, p.ukupnaCijenaPrograma
       FROM ucenici u
       LEFT JOIN profesori_predmeti pp ON pp.idProfesoriPredmeti = u.idProfesoriPredmeti
       LEFT JOIN predmeti p ON pp.idPredmet = p.idPredmet
       LEFT JOIN profesori prof ON pp.idProfesor = prof.idProfesor
        WHERE DATE(u.kreirano) BETWEEN ? AND ?
      `,
      [formattedStartDate, formattedEndDate]
    );
    return query;
  } catch (err: any) {
    return err;
  }
};

// const getAllStudentsWithSubjectName = async (
//   startDare: Date,
//   endDate: Date
// ) => {
//   try {
//     const query = await dbConnection.query(
//       `
//        SELECT u.*, pp.idProfesoriPredmeti, pp.idPredmet, pp.idProfesor, p.nazivPredmeta,prof.ImePrezimeProfesor,p.ukupnaCijenaPrograma
//   FROM ucenici u
//   LEFT JOIN profesori_predmeti pp ON pp.idProfesoriPredmeti = u.idProfesoriPredmeti
//   LEFT JOIN predmeti p ON pp.idPredmet = p.idPredmet
//   LEFT JOIN profesori prof ON pp.idProfesor = prof.idProfesor
// ;`
//     );
//     return query;
//   } catch (err: any) {
//     return err;
//   }
// };

// Function to get a single student by ID
const getStudentById = async (idUcenik: number) => {
  const query = `
  
   SELECT u.*, pp.idProfesoriPredmeti, pp.idPredmet, pp.idProfesor, p.nazivPredmeta,prof.ImePrezimeProfesor,p.ukupnaCijenaPrograma
   FROM ucenici u
   LEFT JOIN profesori_predmeti pp ON pp.idProfesoriPredmeti = u.idProfesoriPredmeti
   LEFT JOIN predmeti p ON pp.idPredmet = p.idPredmet
   LEFT JOIN profesori prof ON pp.idProfesor = prof.idProfesor
   WHERE u.idUcenik = ?
  
  
  `;

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

    ukupnoPlacenoDoSada,
    popust,
    idProfesoriPredmeti,
  } = studentData;

  const query = `
    INSERT INTO ucenici 
    (ImePrezimeUcenika, ImeRoditelja, kontaktRoditelja, emailRoditelja, ocjenaJedan, ocjenaDva, ocjenaTri, ocjenaCetiri, ukupnoPlacenoDoSada,popust,idProfesoriPredmeti,kreirano, azurirano) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
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
    ukupnoPlacenoDoSada,
    popust,
    idProfesoriPredmeti,
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

    ukupnoPlacenoDoSada,
    popust,
    idProfesoriPredmeti,
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
     
      ukupnoPlacenoDoSada = ?, 
      popust = ?,
       idProfesoriPredmeti=?,
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

    ukupnoPlacenoDoSada,
    popust,
    idProfesoriPredmeti,
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

const inertIntoStudentTotalPayments = async (ukupnaSuma: any) => {
  try {
    const sumOfAllStudentPayments = await dbConnection.query(
      `
      UPDATE ucenici 
        SET ukupnoPlacenoDoSada = ? 
        WHERE idUcenik = ? AND idProfesoriPredmeti = ? `,
      [
        ukupnaSuma.sveUplateUcenika,
        ukupnaSuma.idUcenik,
        ukupnaSuma.idProfesoriPredmeti,
      ]
    );
    return sumOfAllStudentPayments;
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
  inertIntoStudentTotalPayments,
};
