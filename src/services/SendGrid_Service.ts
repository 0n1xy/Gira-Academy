import sgMail from "@sendgrid/mail";
import { ISendEmail, ISendMultipleEmail } from "@/types/SendMail_Interface";
import nodemailer from "nodemailer";
export class SendGridService {
  private apiKey: string;
  // private transporter: string

  constructor() {
    this.apiKey = String(process.env.SENDGRID_API_KEY);

    this.initializeSendGrid();
    // this.initializeMailtrap();
  }
  private initializeSendGrid() {
    sgMail.setApiKey(this.apiKey);
  }
  private initializeMailtrap() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST, // Replace with your SMTP server host
      port: parseInt(String(process.env.MAILTRAP_PORT)), // Typically 587 for TLS, 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USER, // Replace with your email
        pass: process.env.MAILTRAP_PASS, // Replace with your email password
      },
    });
    console.log("type of:", typeof transporter);
  }
  public async sendOneEmail(
    options: ISendEmail
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const msg = {
        to: options.to,
        from: String(process.env.SENDGRID_FROM), // Change to your verified sender
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const [response] = await sgMail.send(msg);

      if (response.statusCode === 202) {
        return { success: true };
      } else {
        return { success: false, error: "Failed to send email" };
      }
    } catch (error: any) {
      return { success: false, error: error };
    }
  }
  public async sendMultipleEmail(
    options: ISendMultipleEmail
  ): Promise<{ success: boolean; error?: any }> {
    let success = true;
    const msg = {
      to: options.to,
      from: String(process.env.SENDGRID_FROM),
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    sgMail
      .sendMultiple(msg)
      .then((data) => {
        const statusCode = data[0].statusCode;
        if (statusCode === 202) {
          success = true;
        } else {
          success = false;
        }
      })
      .catch((error: Error) => {
        success = false;
        return { success: false, error: error, path: __filename };
      });
    return { success: success };
  }
}
