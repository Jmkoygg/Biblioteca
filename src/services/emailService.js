import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});
function sendEmail(email, bookTitle, dueDate) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Lembrete: Devolução de Livro",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
    <h2>Lembrete da Biblioteca Comunitária</h2>
    <p>Olá,</p>
    <p>Este é um lembrete para a devolução do livro "${bookTitle}".</p>
    <p>Data de devolução: ${dueDate}</p>
    <p>Por favor, devolva o livro até a data indicada.</p>
    <p>Obrigado por utilizar nossa biblioteca!</p>
    </div>
    `,
  };
  
  transporter.sendMail(mailOptions, (err, info) =>{
      if (err) {
          console.error('error sending email:', err)
        } else {
            console.log('email sent:', info.response)
        }
    })
}

export default sendEmail