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

export default {
  createProfessorSubjectRelation,
};
