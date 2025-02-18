import nodemailer,{ Transporter } from 'nodemailer';
import { ISendEmail } from '@/types/SendMail_Interface';
export class MailtrapService{
    private transporter;
    constructor(){
        // this.transporter = nodemailer.createTransport({
        //     host: 'live.smtp.mailtrap.io', // Replace with your SMTP server host
        //     port: 587, // Typically 587 for TLS, 465 for SSL
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //       user: 'api', // Replace with your email
        //       pass: '9d624b171c1c1cbb16f98b00d034e03b', // Replace with your email password
        //     },
        // });
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io', // Replace with your SMTP server host
            port: 587, // Typically 587 for TLS, 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'a61316362ac7fb', // Replace with your email
              pass: '44ca82db8e27c8', // Replace with your email password
            },
        });
    }
    
    public async sendOneEmail(options: ISendEmail): Promise<{success: boolean; error?: any}>{
        const mailOptions = {
            from: 'mailtrap@demomailtrap.com', // Sender address
            to: options.to, // List of receivers
            subject: options.subject, // Subject line
            text: options.text, // Plain text body
            html: options.html, // HTML body (optional)
          };
        const reponse = await this.transporter.sendMail(mailOptions)
        console.log('reponse',reponse);
        return {success: true}
        // if (reponse.)
        //   // Send the email
        // this.transporter.sendMail(mailOptions).then((data)=>{
        //     const statusCode = data
        //     console.log("statusCode",statusCode)
        //     // if (statusCode === 202) {
        //     //     return {success: true}
        //     // }else{
        //     //     console.log('error mailtrap');
        //     //     return {success: false , error: 'Send email error'}                
        //     // }
        // }).catch(err => {
        //     console.log('error mailtrap');
        //     return {success: false}
        // }); 
        // console.log('Email sent successfully');
        // return{ success: true}
        // console.log('Email sent successfully');
        
    }
}

