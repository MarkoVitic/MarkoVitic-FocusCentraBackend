import professorsRepository from "../repository/professors-repository";
import professorsRepositori from "../repository/professors-repository";

const getAllProfessors = async () => {
  const allProfessors = await professorsRepository.getAllProfessors();

  return allProfessors;
};

const getProfessorById = async (idProfessor: number) => {
  const professor = await professorsRepository.getProfessorById(idProfessor);

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

export default {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};
