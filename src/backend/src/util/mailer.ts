import nodemailer from "nodemailer";
import { Product } from "../models/Product";

const { MAIL_HOST, MAIL_PORT, MAIL_TLS, MAIL_USER, MAIL_PASSWORD } =
  process.env;

export class Mailer {
  // Generate HTML content with cartItems data
  static generateHTML = (header: any, cartItems: any[], body?: string) => {
    const total = 0;
    let html = `<h1>${header}</h1>`;
    html += "<ul>";
    for (const cartItem of cartItems) {
      const product: Product = cartItem.product;
      html += `<li>
    Name: <b> ${product.name} </b> <br>
   Price: <b>  ${product.price} </b> <br>
   Ordered:  <b>  ${cartItem.quantity}</b> <br>
   <br>
    </li>`;
    }
    html += body;
    html += "</ul>";
    return html;
  };

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
      html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      } else {
      }
    });
  };
}
