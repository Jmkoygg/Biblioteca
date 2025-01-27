import cron from 'node-cron'
import moment from 'moment'
import loanRepository from '../repositories/loanRepository.js'
import sendEmail from './emailService.js'
import userRepository from "../repositories/usersRepository.js"
import bookRepository from "../repositories/booksRepository.js"

cron.schedule("25 * * * *", async () =>{
    console.log("Runnig daily job check for due dates...")
    const loans = await loanRepository.findAllLoansRepository()
    const today = moment().startOf('day')

    loans.forEach( async (loan) => {
        const dueDate = moment(loan.dueDate).startOf('day')
        const reminderDueDate = moment(dueDate).subtract(1, "days")
        const userEmailLoan = loan.email
        const bookTitleLoan = loan.title
        if(today.isSame(reminderDueDate)){
            sendEmail(userEmailLoan, bookTitleLoan, loan.dueDate)
        }
    })
})
