import { Router } from "express";

import { userController } from "./users.controller";

const router=Router();

// post users 
router.post("/",userController.createUser);

// get all data from database

router.get("/", userController.getUser);






export const userRouter=router;