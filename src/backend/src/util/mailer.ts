import { log } from "console";
import nodemailer from "nodemailer";

const { MAIL_HOST, MAIL_PORT, MAIL_TLS, MAIL_USER, MAIL_PASSWORD } =
  process.env;


export class Mailer {
  static sendMail = (prop: {
    recipient: string;
    subject: string;
    content: string;
  }) => {
    const { content, recipient, subject } = prop;

    const transporter = nodemailer.createTransport({
      host: String(MAIL_HOST), // Replace with your email provider's SMTP host
      port: Number(MAIL_PORT), // Replace with the SMTP port for your email provider
      secure: false, // Use TLS
      auth: {
        user: String(MAIL_USER), // Replace with your email address
        pass: String(MAIL_PASSWORD), // Replace with your email password
      },
    });

    const mailOptions = {
      from: String(MAIL_USER), // Replace with your email address
      to: recipient, // Replace with recipient's email address
      subject, // Replace with email subject
      text: content, // Replace with email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };
}
