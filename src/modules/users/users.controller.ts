import type { Request, Response } from "express";
import { userService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
   const result=await userService.createUserIntoDb(req.body)
    res.status(200).json({
      success: true,
      message: "created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};


const getUser = async (req: Request, res: Response) => {
  try {
    const result=await userService.getAllDataFromDb()
    res.status(200).json({
      success: true,
      message: "get successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const userController={
    createUser,
    getUser,
}