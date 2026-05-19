import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const {email,password}=req.body
  try {
    const result=await authService.loginUserFromDb(email,password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.jwtAccessToken,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
}


export const authController={
    loginUser,
}