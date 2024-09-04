import globalDateService from "../service/globalDate-service";

import { Request, Response } from "express";

const getAllDates = async (req: Request, res: Response) => {
  try {
    const data = await globalDateService.getAllDates();
    res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const createDate = async (req: Request, res: Response) => {
  let date = req.body;
  try {
    const data = await globalDateService.createDate(date);
    res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updateDate = async (req: Request, res: Response) => {
  let idDate = req.params.id;
  try {
    const data = await globalDateService.updateDate(parseInt(idDate));
    res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const deleteDate = async (req: Request, res: Response) => {
  let idDate = req.params.id;
  try {
    const data = await globalDateService.deleteDate(parseInt(idDate));
    res.send(data);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default { createDate, updateDate, deleteDate, getAllDates };
