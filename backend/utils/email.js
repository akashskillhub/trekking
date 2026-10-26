const { createTransport } = require("nodemailer")
const config = require("../config")

const sendEmail = ({ to, subject, message }) => new Promise(async (resolve, reject) => {
    try {
        const transport = createTransport({
            service: 'gmail',
            auth: { user: config.EMAIL, pass: config.EMAIL_PASSWORD }
        })
        await transport.sendMail({ to, subject, text: message })
        console.log("email send success")
        resolve("email send success")
    } catch (error) {
        console.log(error)
        reject('unable to send email')
    }
})

module.exports = sendEmail