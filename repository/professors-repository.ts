import { dbConnection } from "../common/db-conection";

const getAllProfesorsFromProfessorsTable = async () => {
  try {
    const data = await dbConnection.query(`
    SELECT * 
    FROM profesori
     `);
    return data;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getAllProfessors = async () => {
  try {
    const allProfessors =
      await dbConnection.query(`SELECT  p.ImePrezimeProfesor, s.nazivPredmeta, pp.mjesecniPrihod, pp.ukupniPrihod, pp.procenat,pp.idPredmet, p.idProfesor,pp.idProfesoriPredmeti
    FROM profesori p
    LEFT JOIN profesori_predmeti pp ON pp.idProfesor = p.idProfesor
    LEFT JOIN predmeti s ON pp.idPredmet = s.idPredmet;`);
    return allProfessors;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getProfessorById = async (idPredmet: number, idProfesor: number) => {
  if (idPredmet) {
    try {
      const professor = await dbConnection.query(
        `SELECT p.*,pp.procenat, pp.idPredmet
         FROM profesori p
         JOIN profesori_predmeti pp ON pp.idProfesor = p.idProfesor
         WHERE pp.idPredmet=? and pp.idProfesor=?
  ;`,
        [idPredmet, idProfesor]
      );
      if (professor.length > 0) {
        return professor[0];
      } else {
        return { success: false, msg: "Professor not found" };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  } else {
    try {
      const professor = await dbConnection.query(
        `SELECT p.*,pp.procenat, pp.idPredmet
       FROM profesori p
       LEFT JOIN profesori_predmeti pp ON pp.idProfesor = p.idProfesor
       WHERE  p.idProfesor=?
;`,
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
  const { ImePrezimeProfesor, kontaktProfesor, emailProfesor, adresaProfesor } =
    professorData;

  const query = `
    INSERT INTO profesori 
    (ImePrezimeProfesor, kontaktProfesor, emailProfesor, adresaProfesor, kreirano, azurirano) 
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const values = [
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,
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
  const { ImePrezimeProfesor, kontaktProfesor, emailProfesor, adresaProfesor } =
    professorData;

  const query = `
    UPDATE profesori 
    SET 
      ImePrezimeProfesor = ?, 
      kontaktProfesor = ?, 
      emailProfesor = ?, 
      adresaProfesor = ?, 
    
      
      azurirano = CURRENT_TIMESTAMP
    WHERE idProfesor = ?
  `;

  const values = [
    ImePrezimeProfesor,
    kontaktProfesor,
    emailProfesor,
    adresaProfesor,

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
    console.log(result);
    return result.affectedRows; // Returns the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error deleting professor: ${err.message}`);
  }
};

// Sluzi sa update klone koliko profesor treba da prili za trenutni mjesec

const inserIntoMonthPlacanja = async (
  idProfesor: number,
  mjescniPrihod: number
) => {
  try {
    console.log(mjescniPrihod, idProfesor);
    const query = await dbConnection.query(
      `UPDATE profesori 
      SET prihodMjesecniProfesor = ? 
      WHERE idProfesor = ? `,
      [mjescniPrihod, idProfesor]
    );
    return query;
  } catch (err: any) {
    throw new Error(`Error deleting professor: ${err.message}`);
  }
};
const inserAllSumIntoPlacanja = async (
  idProfesor: number,
  ukupniPrihod: number
) => {
  try {
    const query = await dbConnection.query(
      `UPDATE profesori 
      SET prihodUkupni = ? 
      WHERE idProfesor = ?`,
      [ukupniPrihod, idProfesor]
    );
    return query;
  } catch (err: any) {
    throw new Error(`Error deleting professor: ${err.message}`);
  }
};

// Insert into table profesor id of subjet

const inserIntoProfesoriIdSubject = async (
  idPredmet: number,
  idProfesor: number
) => {
  try {
    const insertIdSubjetInProfesosri = await dbConnection.query(
      `UPDATE profesori 
      SET idPredmet = ? 
      WHERE idProfesor = ? `,
      [idPredmet, idProfesor]
    );
    return insertIdSubjetInProfesosri;
  } catch (err: any) {
    throw new Error(`Error deleting subject: ${err.message}`);
  }
};

export default {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getAllProfessorsWithSubjects,
  inserIntoMonthPlacanja,
  inserAllSumIntoPlacanja,
  inserIntoProfesoriIdSubject,
  getAllProfesorsFromProfessorsTable,
};
