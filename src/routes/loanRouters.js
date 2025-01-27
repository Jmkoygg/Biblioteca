import { Router } from "express";
import loanController from "../controller/loanController.js";
import { validate, validateLoanId } from "../middlewares/validantionMiddleware.js";
import { loanSchema } from "../schema/loanSchema.js";

const router = Router();

router.post(
  "/",
  validate(loanSchema),
  loanController.createLoanController
);
router.get("/", loanController.findAllLoansController);
router.get("/:id", validateLoanId, loanController.findByIdLoanController);
router.delete("/:id", validateLoanId, loanController.deleteLoanController);



export default router;
