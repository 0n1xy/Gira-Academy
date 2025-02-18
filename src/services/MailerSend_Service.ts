import nodemailer,{ Transporter } from 'nodemailer';
import { ISendEmail } from '@/types/SendMail_Interface';
export class MailerSendService{
    private transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:  process.env.MAILERSEND_HOST, // Replace with your SMTP server host
            port: parseInt(String(process.env.MAILERSEND_PORT)), // Typically 587 for TLS, 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAILERSEND_USER , // Replace with your email
              pass: process.env.MAILERSEND_PASS, // Replace with your email password
            },
        });
    }
    
    public async sendOneEmail(options: ISendEmail): Promise<{success: boolean; error?: any}>{
        let success = true
        const mailOptions = {
            from: String(process.env.MAILERSEND_FROM), // Sender address
            to: options.to, // List of receivers
            subject: options.subject, // Subject line
            text: options.text, // Plain text body
            html: options.html, // HTML body (optional)
          };
        const reponse = await this.transporter.sendMail(mailOptions).then(response =>{ 
            console.log('response',response);
            success = true;
        }).catch(err =>{
            console.log('error mailersend: ', err,"filename" ,__filename);
            success = false;
        });
        return {success: success}
        
    }
}

