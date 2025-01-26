import loanRepository from "../repositories/loanRepository.js";

async function createLoanService(userId, bookId, dueDate) {
  const createdLoan = await loanRepository.createLoanRepository(
    userId,
    bookId,
    dueDate
  );
  if (!createdLoan) throw new Error("Error creating Loan");
  return createdLoan;
}
async function findAllLoansService() {
    const loans = await loanRepository.findAllLoansRepository()
    return loans
}

export default {
     createLoanService,
     findAllLoansService
}