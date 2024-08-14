import { dbConnection } from "../common/db-conection"; // Import your database connection module

// Function to get all payments
const getAllPayments = async () => {
  const query = "SELECT * FROM placanja";

  try {
    const payments = await dbConnection.query(query);
    return payments; // Return all records
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
  const {
    bazicnaCijenaPrograma,
    popustPoUceniku,
    finalnaCijenaPrograma,
    mjesecnoPlacanje,
    idUcenik,
    idPredmet,
  } = paymentData;

  const query = `
    INSERT INTO placanja 
    (bazicnaCijenaPrograma, popustPoUceniku, finalnaCijenaPrograma, mjesecnoPlacanje, idUcenik, idPredmet) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    bazicnaCijenaPrograma,
    popustPoUceniku,
    finalnaCijenaPrograma,
    mjesecnoPlacanje,
    idUcenik,
    idPredmet,
  ];

  try {
    const result = await dbConnection.query(query, values);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (err: any) {
    throw new Error(`Error creating payment: ${err.message}`);
  }
};

// Function to update an existing payment
const updatePayment = async (idPlacanje: number, paymentData: any) => {
  const {
    bazicnaCijenaPrograma,
    popustPoUceniku,
    finalnaCijenaPrograma,
    mjesecnoPlacanje,
    idUcenik,
    idPredmet,
  } = paymentData;

  const query = `
    UPDATE placanja 
    SET 
      bazicnaCijenaPrograma = ?, 
      popustPoUceniku = ?, 
      finalnaCijenaPrograma = ?, 
      mjesecnoPlacanje = ?, 
      idUcenik = ?, 
      idPredmet = ?, 
      azurirano = CURRENT_TIMESTAMP
    WHERE idPlacanje = ?
  `;

  const values = [
    bazicnaCijenaPrograma,
    popustPoUceniku,
    finalnaCijenaPrograma,
    mjesecnoPlacanje,
    idUcenik,
    idPredmet,
    idPlacanje,
  ];

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
};
