import { transport } from "../../config/nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
      await transport.sendMail({
    from: 'Equipe FeedbackWidget <contato@feedbackwidget.io>',
    to: 'Bruno Mariani <bruno0907@gmail.com>',
    subject,
    html: body
  })
  }
}