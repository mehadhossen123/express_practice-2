import express, {
  type Application,
  type Request,
  type Response,
} from "express";


import { userRouter } from "../modules/users/users.route";

const app: Application = express();
app.use(express.json());
app.use("/api/users",userRouter)




app.get("/", (req: Request, res: Response) => {
  res.send("this is express server");
});






// delete single data form users

export default app