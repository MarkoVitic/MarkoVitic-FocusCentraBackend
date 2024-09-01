import studentsRepository from "../repository/students-repository";

// Service to get all students
const getAllStudents = async () => {
  try {
    const students = await studentsRepository.getAllStudents();
    return { success: true, data: students };
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving students: ${err.message}`,
    };
  }
};

const getAllStudentsWithSubjectName = async () => {
  try {
    const students = await studentsRepository.getAllStudentsWithSubjectName();
    students.forEach((element: any) => {
      element.ukupnaCijenaPrograma -= Math.round(
        (element.ukupnaCijenaPrograma * element.popust) / 100
      );
    });

    return students;
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving students: ${err.message}`,
    };
  }
};

// Service to get a single student by ID
const getStudentById = async (idUcenik: number) => {
  try {
    const student = await studentsRepository.getStudentById(idUcenik);

    if (student) {
      return { success: true, data: student };
    } else {
      return { success: false, message: "Student not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving student by ID: ${err.message}`,
    };
  }
};

// Service to create a new student
const createStudent = async (studentData: any) => {
  try {
    const newStudentId = await studentsRepository.createStudent(studentData);
    return {
      success: true,
      id: newStudentId,
      message: "Student created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating student: ${err.message}`,
    };
  }
};

// Service to update an existing student
const updateStudent = async (idUcenik: number, studentData: any) => {
  try {
    const affectedRows = await studentsRepository.updateStudent(
      idUcenik,
      studentData
    );

    if (affectedRows > 0) {
      return { success: true, message: "Student updated successfully" };
    } else {
      return {
        success: false,
        message: "Student not found or no changes made",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error updating student: ${err.message}`,
    };
  }
};

// Service to delete a student by ID
const deleteStudent = async (idUcenik: number) => {
  try {
    const affectedRows = await studentsRepository.deleteStudent(idUcenik);

    if (affectedRows > 0) {
      return { success: true, message: "Student deleted successfully" };
    } else {
      return { success: false, message: "Student not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting student: ${err.message}`,
    };
  }
};

const inertIntoStudentTotalPayments = async (ukupnaSuma: any) => {
  try {
    const sumOfAllStudentPayments =
      await studentsRepository.inertIntoStudentTotalPayments(ukupnaSuma);
    return sumOfAllStudentPayments;
  } catch (err: any) {
    return {
      success: false,
      message: `Error all payments by student: ${err.message}`,
    };
  }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsWithSubjectName,
  inertIntoStudentTotalPayments,
};
