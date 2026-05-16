import { Router } from "express";

import { userController } from "./users.controller";

const router=Router();

// post users 
router.post("/",userController.createUser);





export const userRouter=router;