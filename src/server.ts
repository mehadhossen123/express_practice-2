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

// get all data form user
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




// the server is start here 
app.listen(port,()=>{
    console.log(`the server is running on port : ${port}`)
})