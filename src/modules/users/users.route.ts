import { Router } from "express";

import { userController } from "./users.controller";

const router=Router();

// post users 
router.post("/",userController.createUser);

// get all data from database
router.get("/", userController.getUser);



// get data by single id
router.get("/:id",userController.getSingleUser );
// Edit users
router.put("/:id", userController.putUser);

// delete users
router.delete("/:id", userController.deleteUser);








export const userRouter=router;