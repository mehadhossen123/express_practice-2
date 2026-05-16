import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "../database/db";
import { userRouter } from "../modules/users/users.route";



const app: Application = express();
app.use(express.json());
app.use("/api/users",userRouter)




app.get("/", (req: Request, res: Response) => {
  res.send("this is express server");
});



// get all data form users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT *FROM users
    
        `,
    );
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
});

// get single data from users
app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT *FROM users WHERE id=$1
    
        `,
      [id],
    );
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
});

// here we have to edit data using put method .
app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { name, email, age, password } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      `
    UPDATE  users SET 
    name=COALESCE($1,name),
    email=COALESCE($2,email),
    age=COALESCE($3,age),
    password=COALESCE($4,password)
    WHERE id=$5 RETURNING*
    
    `,
      [name, email, age, password, id],
    );
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
});

// delete single data form users
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      DELETE FROM users WHERE id=$1
    
        `,
      [id],
    );

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
});

export default app