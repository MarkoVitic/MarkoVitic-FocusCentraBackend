import { dbConnection } from "../common/db-conection";

const getAllDates = async () => {
  try {
    const data = await dbConnection.query(`SELECT * FROM globalni_datum;`);
    return data;
  } catch (err: any) {
    console.error("Error fetching dates:", err);
    throw err;
  }
};

const createDate = async (date: any) => {
  try {
    const data = await dbConnection.query(
      `INSERT INTO globalni_datum (pocetakGodine, krajGodine,nazivDatuma, kreirano, azurirano) 
         VALUES (?, ?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [date.pocetakGodine, date.krajGodine, date.nazivDatuma]
    );
    return data;
  } catch (err: any) {
    return err;
  }
};

const updateDate = async (idDate: number) => {
  try {
    const data = await dbConnection.query(
      `
          UPDATE globalni_datum
          SET azurirano = CURRENT_TIMESTAMP
          WHERE idDatum = ?
        `,
      [idDate]
    );
    return data;
  } catch (err: any) {
    return err;
  }
};

const deleteDate = async (idDate: number) => {
  try {
    const data = await dbConnection.query(
      `
          DELETE FROM globalni_datum
          WHERE idDatum = ?
        `,
      [idDate]
    );
    return data;
  } catch (err: any) {
    return err;
  }
};

export default { createDate, updateDate, deleteDate, getAllDates };
