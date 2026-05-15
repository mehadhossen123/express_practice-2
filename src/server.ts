import express, { type Application, type Request, type Response } from 'express'
import { Pool } from "pg";
import config from './config';
const app:Application=express();
app.use(express.json())
const port=config.port;



// connect database with the server 
// pool is a connection manager with server and database.
const pool = new Pool({
  connectionString:config.connection_string
   
});
// initialized the database
const initDB=async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY ,
            name VARCHAR(20) ,
            email VARCHAR(20) UNIQUE NOT NULL,
            age INT,
            password VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            )

            `)
            console.log("the server connect with postgresql")
        
    } catch (error) {
        console.log(error)
        
    }
}
initDB()



app.get("/",(req:Request,res:Response)=>{
    res.send("this is express server")
    
})
app.post("/api/users",async(req:Request,res:Response)=>{
   try {
     const { name, email, age, password } = req.body;
     const result = await pool.query(
       `
    INSERT INTO users(name,email,age,password)
    values($1,$2,$3,$4) RETURNING*
        `,
       [name, email, age, password],
     );
     res.status(200).json({
        success:true,
        message:"created successfully",
        data:result.rows[0]
     })
    
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        data:[]
    })
    
   }
})

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
    const {id}=req.params
    const result = await pool.query(
      `
      SELECT *FROM users WHERE id=$1
    
        `,
    [id]);
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
app.put("/api/users/:id",async(req:Request,res:Response)=>{
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
     } catch (error:any) {
        res.status(500).json({
          success: false,
          message:error.message,
          data: [],
        });
        
     }
})



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
    if (result.rowCount==0) {
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



// the server is start here 
app.listen(port,()=>{
    console.log(`the server is running on port : ${port}`)
})