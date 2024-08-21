import { dbConnection } from "../common/db-conection"; // Import your database connection module

// Function to retrieve payments with additional data
const getAllPayments = async () => {
  const query = `
     select p.*, u.ImePrezimeUcenika, pr.nazivPredmeta
    from placanja p, ucenici u, predmeti pr
    where p.idUcenik=u.idUcenik and p.idPredmet=u.idPredmet
    and u.idPredmet=pr.idPredmet ;
  `; // Bind the start and end date for the query

  try {
    const payments = await dbConnection.query(query);
    return payments; // Return the retrieved records
  } catch (err: any) {
    throw new Error(`Error retrieving payments: ${err.message}`);
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
  const { iznosUplate, kreirano, azurirano, idUcenik, idPredmet, idProfesor } =
    paymentData;

  const query = `
    INSERT INTO placanja 
    (   iznosUplate, kreirano, azurirano, idUcenik, idPredmet,idProfesor) 
    VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?)
  `;

  const values = [iznosUplate, idUcenik, idPredmet, idProfesor];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (err: any) {
    throw new Error(`Error creating payment: ${err.message}`);
  }
};

const getSumForMonthProfesor = async (
  idPredmet: number,
  idProfesor: number
) => {
  try {
    const sumFromMonth = await dbConnection.query(
      ` SELECT idProfesor, SUM(iznosUplate) AS prihodMjesecniProfesor
  FROM placanja
  WHERE idPredmet = ? and idProfesor = ?
  GROUP BY idProfesor;`,
      [idPredmet, idProfesor]
    );

    return sumFromMonth;
  } catch (err) {
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
};
