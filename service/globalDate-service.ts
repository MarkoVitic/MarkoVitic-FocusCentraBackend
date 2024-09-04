import globalDateRepository from "../repository/globalDate-repository";

const getAllDates = async () => {
  try {
    const data = await globalDateRepository.getAllDates();
    return data;
  } catch (err: any) {
    return err;
  }
};

const createDate = async (date: any) => {
  try {
    const data = await globalDateRepository.createDate(date);

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error creating global date: ${err.message}`,
    };
  }
};

const updateDate = async (idDate: number) => {
  try {
    const data = await globalDateRepository.updateDate(idDate);

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error update global date: ${err.message}`,
    };
  }
};

const deleteDate = async (idDate: number) => {
  try {
    const data = await globalDateRepository.deleteDate(idDate);

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: `Error delete global date: ${err.message}`,
    };
  }
};

export default { createDate, updateDate, deleteDate, getAllDates };
