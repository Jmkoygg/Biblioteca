import { Router } from "express";
import loanController from "../controller/loanController.js";
import { validate, validateLoanId } from "../middlewares/validantionMiddleware.js";
import { loanSchema } from "../schema/loanSchema.js";

const router = Router();

router.post(
  "/loans",
  validate(loanSchema),
  loanController.createLoanController
);
router.get("/loans", loanController.findAllLoansController);
router.get("/loans/:id", validateLoanId, loanController.findByIdLoanController);
router.delete("/loans/:id", validateLoanId, loanController.deleteLoanController);



export default router;
