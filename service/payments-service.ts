import paymentsRepository from "../repository/payments-repository";

// Service to get all payments
const getAllPayments = async (startDate: Date, endDate: Date) => {
  try {
    const payments = await paymentsRepository.getAllPayments(
      startDate,
      endDate
    );
    return { success: true, data: payments };
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving payments: ${err.message}`,
    };
  }
};

// Service to get a single payment by ID
const getPaymentById = async (idPlacanje: number) => {
  try {
    const payment = await paymentsRepository.getPaymentById(idPlacanje);

    if (payment) {
      return { success: true, data: payment };
    } else {
      return { success: false, message: "Payment not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error retrieving payment by ID: ${err.message}`,
    };
  }
};

// Service to create a new payment
const createPayment = async (paymentData: any) => {
  try {
    const newPaymentId = await paymentsRepository.createPayment(paymentData);

    return {
      success: true,
      id: newPaymentId,
      message: "Payment created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating payment: ${err.message}`,
    };
  }
};

// Service to update an existing payment
const updatePayment = async (idPlacanje: number, paymentData: any) => {
  try {
    const affectedRows = await paymentsRepository.updatePayment(
      idPlacanje,
      paymentData
    );

    if (affectedRows > 0) {
      return { success: true, message: "Payment updated successfully" };
    } else {
      return {
        success: false,
        message: "Payment not found or no changes made",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error updating payment: ${err.message}`,
    };
  }
};

// Service to delete a payment by ID
const deletePayment = async (idPlacanje: number) => {
  try {
    const affectedRows = await paymentsRepository.deletePayment(idPlacanje);

    if (affectedRows > 0) {
      return { success: true, message: "Payment deleted successfully" };
    } else {
      return { success: false, message: "Payment not found" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting payment: ${err.message}`,
    };
  }
};

const getSumForMonthProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const getSumMonth = await paymentsRepository.getSumForMonthProfesor(
      idProfesoriPredmeti
    );

    return getSumMonth;
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting payment: ${err.message}`,
    };
  }
};

const getSumForProfesor = async (idProfesoriPredmeti: number) => {
  try {
    const getSumMonth = await paymentsRepository.getSumForProfesor(
      idProfesoriPredmeti
    );

    return getSumMonth;
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting payment: ${err.message}`,
    };
  }
};
const getSumForProfesorGlobalDate = async (
  idProfesoriPredmeti: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    const getSumMonth = await paymentsRepository.getSumForProfesorGlobalDate(
      idProfesoriPredmeti,
      startDate,
      endDate
    );

    return getSumMonth;
  } catch (err: any) {
    return {
      success: false,
      message: `Error inser into payment: ${err.message}`,
    };
  }
};

const getSumForStudentPayments = async (
  idUcenik: number,
  idProfesoriPredmeti: number
) => {
  try {
    const sumForStudentPayments =
      await paymentsRepository.getSumForStudentPayments(
        idUcenik,
        idProfesoriPredmeti
      );
    return sumForStudentPayments;
  } catch (err: any) {
    return {
      success: false,
      message: `Error deleting payment: ${err.message}`,
    };
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
