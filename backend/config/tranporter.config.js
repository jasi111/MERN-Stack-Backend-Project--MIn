import nodemailer from 'nodemailer'
import config from "./index"

// below codes copied from nodemailer documentation
let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
    // values for config. is coming from .env
  });

  export default transporter