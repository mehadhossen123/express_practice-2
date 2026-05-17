import { pool } from "../../database/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginUserFromDb = async (email: string, password: string) => {
  /* we have to three work here to login users
    1.dekte hobe user database a ase kina . 
    2.password  ta compare korte hobe 
    3. then jwt token create korte hobe 
    */
  // 1
  const usersData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  if (usersData.rows[0] == 0) {
    throw new Error("Invalid credentials");
  }

  const users = usersData.rows[0];
  // compare password
  const isMatched =await bcrypt.compare(password, users.password);
  if(!isMatched){
    throw new Error("Invalid credentials");
  }
//   jwt payload 
const payload={
    name:users.name,
    id:users.id,
    email:users.email
}
const jwtAccessToken= jwt.sign(payload,"eewreprpo",{expiresIn:"1d"})
return {jwtAccessToken}
};

export const authService={
    loginUserFromDb,
}