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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   const result=await userService.getSingleDataFromDb(id as string)
    // if data is not found
    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "data not found",
        data: [],
      });
    }
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

const putUser = async (req: Request, res: Response) => {
  try {
   
    const { id } = req.params;
const result=await userService.putSingleUser(req.body,id as string)
   
    // if data is not found
    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "data not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   const result=await userService.deleteUsers(id as string)

    // if data is not found
    if (result.rowCount == 0) {
      return res.status(404).json({
        success: false,
        message: "data not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "deleted successfully",
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

export const userController={
    createUser,
    getUser,
    getSingleUser,
    putUser,
    deleteUser,
}