import professorsSubjectsRepository from "../repository/professors-subjects-repository";

const createProfessorSubjectRelation = async (professorSubjectData: any) => {
  try {
    const data =
      await professorsSubjectsRepository.createProfessorSubjectRelation(
        professorSubjectData
      );
    console.log(data);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating createProfessorSubjectRelation: ${err.message}`,
    };
  }
};

const editProcenatProfessorSubject = async (
  idProfessor: number,
  idSubject: number,
  procent: number
) => {
  try {
    const data =
      await professorsSubjectsRepository.editProcenatProfessorSubject(
        idProfessor,
        idSubject,
        procent
      );
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error updaitnig editProcenatProfessorSubject: ${err.message}`,
    };
  }
};

const deleteProfessorSubjectRelation = async (
  idProfesor: number,
  idSubject: number
) => {
  try {
    const data =
      await professorsSubjectsRepository.deleteProfessorSubjectRelation(
        idProfesor,
        idSubject
      );
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting ProcenatProfessorSubject: ${err.message}`,
    };
  }
};

export default {
  createProfessorSubjectRelation,
  editProcenatProfessorSubject,
  deleteProfessorSubjectRelation,
};
