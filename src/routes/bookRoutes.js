import bookController from "../controller/bookController.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { bookSchema } from "../schema/bookSchema.js";
import { validate, validateBookId } from "../middlewares/validantionMiddleware.js"


const router = Router();


router.get("/books", bookController.findAllBooksController);
router.use(authMiddleware);
router.post("/books", validate(bookSchema), bookController.createBookController);
router.get("/books/search", bookController.searchBookController)
router.get("/books/:id", validateBookId, bookController.findBookByIdController);
router.patch("/books/:id", validateBookId, bookController.updateBookController);
router.delete("/books/:id",validateBookId, bookController.deleteBookController);



export default router;