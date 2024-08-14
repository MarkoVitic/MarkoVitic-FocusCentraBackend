import subjectRepository from "../repository/subjects-repository";

// Service to get all subjects
const getAllSubjects = async () => {
  try {
    const subjects = await subjectRepository.getAllSubjects();
    return { success: true, data: subjects };
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving subjects: ${err.message}`,
    };
  }
};

// Service to get a single subject by ID
const getSubjectById = async (idPredmet: number) => {
  try {
    const subject = await subjectRepository.getSubjectById(idPredmet);

    if (subject) {
      return { success: true, data: subject };
    } else {
      return { success: false, message: "Subject not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving subject by ID: ${err.message}`,
    };
  }
};

// Service to create a new subject
const createSubject = async (subjectData: any) => {
  try {
    const newSubjectId = await subjectRepository.createSubject(subjectData);
    return {
      success: true,
      id: newSubjectId,
      message: "Subject created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating subject: ${err.message}`,
    };
  }
};

// Service to update an existing subject
const updateSubject = async (idPredmet: number, subjectData: any) => {
  try {
    const affectedRows = await subjectRepository.updateSubject(
      idPredmet,
      subjectData
    );

    if (affectedRows > 0) {
      return { success: true, message: "Subject updated successfully" };
    } else {
      return {
        success: false,
        message: "Subject not found or no changes made",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error updating subject: ${err.message}`,
    };
  }
};

// Service to delete a subject by ID
const deleteSubject = async (idPredmet: number) => {
  try {
    const affectedRows = await subjectRepository.deleteSubject(idPredmet);

    if (affectedRows > 0) {
      return { success: true, message: "Subject deleted successfully" };
    } else {
      return { success: false, message: "Subject not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting subject: ${err.message}`,
    };
  }
};

export default {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
