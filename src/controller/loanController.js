import loansService from "../services/loansService.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createdLoan = await loansService.createLoanService(
      userId,
      bookId,
      dueDate
    );
    res.status(201).send(createdLoan);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function findAllLoansController(req, res) {
  try {
    const loans = await loansService.findAllLoansService();
    res.send(loans);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
async function findByIdLoanController(req, res) {
  const loanId = req.params.id;
  try {
    const loan = await loansService.findLoanByIdsService(loanId);
    res.send(loan);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
async function deleteLoanController(req, res) {
  const loanId = req.params.id;
  const userId = req.userId;
  try {
    const response = await loansService.deleteLoanService(loanId, userId);
    res.send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
export default {
  createLoanController,
  findAllLoansController,
  findByIdLoanController,
  deleteLoanController,
};
