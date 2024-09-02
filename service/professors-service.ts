import professorsRepository from "../repository/professors-repository";
import professorsRepositori from "../repository/professors-repository";

const getAllProfessors = async () => {
  try {
    const allProfessors = await professorsRepository.getAllProfessors();

    //Zarada profesora za mjesec i ukupno koliko su zaradili od pocetka
    allProfessors.forEach((element: any) => {
      element.mjesecniPrihod =
        (element.mjesecniPrihod * element.procenat) / 100;
      element.ukupniPrihod = (element.ukupniPrihod * element.procenat) / 100;
    });

    return allProfessors;
  } catch (err) {
    return { success: false, msg: err };
  }
};

const getAllProfesorsFromProfessorsTable = async () => {
  try {
    const data =
      await professorsRepository.getAllProfesorsFromProfessorsTable();

    return data;
  } catch (err) {
    return { success: false, msg: err };
  }
};

//Get All with Subjects
const getAllProfessorsWithSubjects = async () => {
  const allProfessors =
    await professorsRepositori.getAllProfessorsWithSubjects();
  return allProfessors;
};

const getProfessorById = async (idPredmet: number, idProfessor: number) => {
  const professor = await professorsRepository.getProfessorById(
    idPredmet,
    idProfessor
  );

  return professor;
};

// Service to create a new professor
const createProfessor = async (professorData: any) => {
  try {
    const newProfessorId = await professorsRepository.createProfessor(
      professorData
    );
    return {
      success: true,
      id: newProfessorId,
      message: "Professor created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating professor: ${err.message}`,
    };
  }
};

// Service to update an existing professor
const updateProfessor = async (idProfessor: number, professorData: any) => {
  try {
    const updatedRows = await professorsRepository.updateProfessor(
      idProfessor,
      professorData
    );

    if (updatedRows > 0) {
      return { success: true, message: "Professor updated successfully" };
    } else {
      return {
        success: false,
        message: "Professor not found or no changes made",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error updating professor: ${err.message}`,
    };
  }
};

// Service to delete a professor by ID
const deleteProfessor = async (idProfessor: number) => {
  try {
    const affectedRows = await professorsRepository.deleteProfessor(
      idProfessor
    );

    if (affectedRows > 0) {
      return { success: true, message: "Professor deleted successfully" };
    } else {
      return { success: false, message: "Professor not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting professor: ${err.message}`,
    };
  }
};

const inserIntoMonthPlacanja = async (
  idProfesoriPredmeti: number,
  mjescniPrihod: number
) => {
  try {
    const data = await professorsRepository.inserIntoMonthPlacanja(
      idProfesoriPredmeti,
      mjescniPrihod
    );

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Cannot add month earning for profesor: ${err.message}`,
    };
  }
};

const inserAllSumIntoPlacanja = async (
  idProfesoriPredmeti: number,
  ukupniPrihod: number
) => {
  try {
    const data = await professorsRepository.inserAllSumIntoPlacanja(
      idProfesoriPredmeti,
      ukupniPrihod
    );
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Cannot add month earning for profesor: ${err.message}`,
    };
  }
};

const inserIntoProfesoriIdSubject = async (
  idPredmet: number,
  idProfesor: number
) => {
  try {
    const data = await professorsRepositori.inserIntoProfesoriIdSubject(
      idPredmet,
      idProfesor
    );

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Cannot add subjet to table profesori: ${err.message}`,
    };
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
