import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9757190fb2f423",
    pass: "ce0d0a685a8138"
  }
})