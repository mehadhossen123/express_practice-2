
import { pool } from "../../database/db";
import bcrypt from 'bcrypt'

const createUserIntoDb=async(payload:any)=>{
     const { name, email, age, password } =payload;
     const hashedPassword=await bcrypt.hash(password,10)
     console.log(hashedPassword)
     const result = await pool.query(
       `
    INSERT INTO users(name,email,age,password)
    values($1,$2,$3,$4) RETURNING*
        `,
       [name, email, age, hashedPassword],
     );

     return result
}


const getAllDataFromDb=async()=>{
    const result = await pool.query(
      `
      SELECT *FROM users
    
        `,
        
    );
    return result
}

const getSingleDataFromDb=async(id :string)=>{
     const result = await pool.query(
       `
      SELECT *FROM users WHERE id=$1
    
        `,
       [id],
     );
     return result;
}

const putSingleUser=async(payload:any,id:string)=>{
     const { name, email, age, password } = payload;
    //  const { id } = req.params;
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
     return result
}

const deleteUsers=async(id:string)=>{
     const result = await pool.query(
       `
      DELETE FROM users WHERE id=$1
    
        `,
       [id],
     );
     return result;
}


export const userService={
    createUserIntoDb,
    getAllDataFromDb,
    getSingleDataFromDb,
    putSingleUser,
    deleteUsers,
}