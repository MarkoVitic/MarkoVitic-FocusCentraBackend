import { dbConnection } from "../common/db-conection"; // Import your database connection module

// Function to retrieve payments with additional data
const getAllPayments = async (startDate: Date, endDate: Date) => {
  // Format the dates to YYYY-MM-DD format (removing the time and Z part)
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  const query = `
    SELECT pl.*, pp.idProfesor, pp.idPredmet, u.idUcenik, u.ImePrezimeUcenika, 
           p.nazivPredmeta, prof.ImePrezimeProfesor, pp.idProfesoriPredmeti
    FROM placanja pl
    LEFT JOIN profesori_predmeti pp ON pp.idProfesoriPredmeti = pl.idProfesoriPredmeti
    LEFT JOIN ucenici u ON pl.idUcenik = u.idUcenik
    LEFT JOIN predmeti p ON p.idPredmet = pp.idPredmet
    LEFT JOIN profesori prof ON prof.idProfesor = pp.idProfesor
     WHERE DATE(pl.kreirano) BETWEEN ? AND ?
  `;

  const queryParams = [formattedStartDate, formattedEndDate]; // Parameters for the query

  try {
    const payments = await dbConnection.query(query, queryParams);
    return payments; // Return the retrieved records
  } catch (err: any) {
    throw new Error(`Error retrieving payments from database: ${err.message}`);
  }
};

// Function to get a single payment by ID
const getPaymentById = async (idPlacanje: number) => {
  const query = "SELECT * FROM placanja WHERE idPlacanje = ?";

  try {
    const payment = await dbConnection.query(query, [idPlacanje]);
    return payment; // Return the first record if found
  } catch (err: any) {
    throw new Error(`Error retrieving payment by ID: ${err.message}`);
  }
};

// Function to create a new payment
const createPayment = async (paymentData: any) => {
  const { iznosUplate, idUcenik, idProfesoriPredmeti } = paymentData;

  const query = `
    INSERT INTO placanja 
    (iznosUplate, idUcenik, idProfesoriPredmeti, kreirano, azurirano) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const values = [iznosUplate, idUcenik, idProfesoriPredmeti];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (err: any) {
    throw new Error(`Error creating payment: ${err.message}`);
  }
};

const getSumForMonthProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const sumFromMonth = await dbConnection.query(
      ` SELECT idProfesoriPredmeti, SUM(iznosUplate) AS prihodMjesecniProfesor
FROM placanja
WHERE  idProfesoriPredmeti = ?  
  AND MONTH(kreirano) = MONTH(CURRENT_DATE())
  AND YEAR(kreirano) = YEAR(CURRENT_DATE())
GROUP BY idProfesoriPredmeti;`,
      [idProfesoriPredmeti]
    );

    return sumFromMonth;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getSumForProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const sumFromMonth = await dbConnection.query(
      ` SELECT idProfesoriPredmeti, SUM(iznosUplate) AS prihodMjesecniProfesor
  FROM placanja
  WHERE idProfesoriPredmeti = ?
  GROUP BY idProfesoriPredmeti
  
  ;`,
      [idProfesoriPredmeti]
    );

    return sumFromMonth;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getSumForProfesorGlobalDate = async (
  idProfesoriPredmeti: number,
  startDate: Date,
  endDate: Date
) => {
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  try {
    const sumFromMonth = await dbConnection.query(
      ` SELECT idProfesoriPredmeti, SUM(iznosUplate) AS prihodMjesecniProfesor
       FROM placanja
       WHERE idProfesoriPredmeti = ?
         AND DATE(kreirano) BETWEEN ? AND ?
       GROUP BY idProfesoriPredmeti;
  ;`,
      [idProfesoriPredmeti, formattedStartDate, formattedEndDate]
    );

    return sumFromMonth;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getSumForStudentPayments = async (
  idUcenik: number,
  idProfesoriPredmeti: number
) => {
  try {
    const sumForStudentPayments = await dbConnection.query(
      `
      SELECT idUcenik, idProfesoriPredmeti, SUM(iznosUplate) AS sveUplateUcenika
  FROM placanja
  WHERE idUcenik = ? and idProfesoriPredmeti = ?
  GROUP BY idUcenik;`,
      [idUcenik, idProfesoriPredmeti]
    );

    return sumForStudentPayments;
  } catch (err: any) {
    return { success: false, msg: err };
  }
};

// Function to update an existing payment
const updatePayment = async (idPlacanje: number, paymentData: any) => {
  const { iznosUplate, idUcenik, idPredmet } = paymentData;

  const query = `
    UPDATE placanja 
    SET 
      
      iznosUplate = ?, 
      idUcenik = ?, 
      idPredmet = ?, 
      azurirano = CURRENT_TIMESTAMP
    WHERE idPlacanje = ?
  `;

  const values = [iznosUplate, idUcenik, idPredmet, idPlacanje];

  try {
    const result = await dbConnection.query(query, values);
    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error updating payment: ${err.message}`);
  }
};

// Function to delete a payment by ID
const deletePayment = async (idPlacanje: number) => {
  const query = "DELETE FROM placanja WHERE idPlacanje = ?";

  try {
    const result = await dbConnection.query(query, [idPlacanje]);

    return result.affectedRows; // Return the number of rows affected (should be 1 if successful)
  } catch (err: any) {
    throw new Error(`Error deleting payment: ${err.message}`);
  }
};

export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getSumForMonthProfesor,
  getSumForProfesor,
  getSumForStudentPayments,
  getSumForProfesorGlobalDate,
};
