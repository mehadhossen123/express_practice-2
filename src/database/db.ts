// connect database with the server 

import { Pool } from "pg";
import config from "../config";


// pool is a connection manager with server and database.
export const pool = new Pool({
  connectionString:config.connection_string
   
});
// initialized the database
export const initDB=async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY ,
            name VARCHAR(20) ,
            email VARCHAR(20) UNIQUE NOT NULL,
            age INT,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            )

            `)
            console.log("the server connect with postgresql")
        
    } catch (error) {
        console.log(error)
        
    }
}