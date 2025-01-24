import { Router } from "express";
import userController from "../controller/userControllers.js";
import { validate, validateUserId } from "../middlewares/validantionMiddleware.js";
import  userSchema  from "../schema/userSchema.js"

const router = Router();

router.post("/users", validate(userSchema), userController.createUserController);

router.get("/users", userController.findAllUsersController);
router.get("/users/:id",validateUserId, userController.findUserByIdController);
router.patch("/users/:id", validateUserId, userController.updateUserControler);
router.delete("/users/:id", validateUserId, userController.deleteUserService);
export default router;