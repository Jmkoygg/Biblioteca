import { Router } from "express";
import userController from "../controller/userControllers.js";
import { validate, validateUserId } from "../middlewares/validantionMiddleware.js";
import { userSchema }  from "../schema/userSchema.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", validate(userSchema), userController.createUserController);
router.post("/login", userController.loginUsersController);
router.use(authMiddleware);
router.get("/", userController.findAllUsersController);
router.get("/:id",validateUserId, userController.findUserByIdController);
router.patch("/:id", validateUserId, userController.updateUserControler);
router.delete("/:id", validateUserId, userController.deleteUserService);
export default router;