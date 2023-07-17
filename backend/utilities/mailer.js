const nodemailer = require("nodemailer")
const sendMessage = async(email) => {
    
    const mailTemplate = `
        <div>
            <h6>Message: Welcome message</h6>
            <p>
                Dear ${email},
                Welcome to our application. I hope you have a wonderful time here
            </p>
        </div>
    `
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.GMAIL,
        to:email,
        html: mailTemplate,
        subject:"Welcome mail"
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {sendMessage}