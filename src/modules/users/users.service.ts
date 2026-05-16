
import { pool } from "../../database/db";

const createUserIntoDb=async(payload:any)=>{
     const { name, email, age, password } =payload;
     const result = await pool.query(
       `
    INSERT INTO users(name,email,age,password)
    values($1,$2,$3,$4) RETURNING*
        `,
       [name, email, age, password],
     );

     return result
}


export const userService={
    createUserIntoDb,
}