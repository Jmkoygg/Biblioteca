import loansService from "../services/loansService.js";

async function createLoanController(req, res) {
    const { bookId, dueDate } = req.body
    const userId = req.userId

    try {
        const createdLoan = await loansService.createLoanService(userId, bookId, dueDate)
        res.status(201).send(createdLoan)
    }
     catch (error) {
        res.status(400).send(error.message)
     }
}
async function findAllLoansController(req, res){
    try{
        const loans = await loansService.findAllLoansService()
        res.send(loans)
    } catch (err){
        res.status(404).send(err.message)
    }
}
export default{
    createLoanController,
    findAllLoansController
}