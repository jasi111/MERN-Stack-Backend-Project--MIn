import config from "../config/transporter.config.js"
import config from "../config/index"
import transporter from "../config/tranporter.config.js"

const mailHelper = async (options)=>{
const message ={

        from: config.SMTP_MAIL_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: optiond.subject, // Subject line
        text: options.text, // plain text body
        // html: options.html, // html body
    
}

await transporter.sendMail(message)
}

export default mailHelper