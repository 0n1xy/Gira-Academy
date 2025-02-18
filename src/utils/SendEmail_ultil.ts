import { SendMailService } from "@/services/SendEmailMain_Service"
import { ISendEmail, ISendMultipleEmail } from "@/types/SendMail_Interface"
import { SendOneEmailValidate ,SendMultipleEmailValidate} from "@/validates/SendEmail_Validate"


const sendEmail = new SendMailService()
export function SendOneEmailExample(){
  const to = "phatnlmgcs200137@fpt.edu.vn"
  const subject = "Import tant notifications"
  const text = "and easy to do anywhere, even with Node.js"
  const html ="<strong>You have been selected for nodejs position in my company</strong>"
  const SendOneEmailOption: ISendEmail = {
    to: to,
    subject: subject,
    text: text,
    html: html,
  }
  const SendEmailValidate = SendOneEmailValidate(SendOneEmailOption)
  if(SendEmailValidate.success){
    sendEmail.sendOneEmail(SendOneEmailOption)
  }else{
    console.log(SendEmailValidate.message)
  }
  
}
export function SendMultipleEmailExample(){
  //Send email To someone
  const to = ['nguyenleminhphat0608@gmail.com','phatnlmgcs200137@fpt.edu.vn']
  //Title of email 
  const subject = "Important notifications 2"
  const text = "and easy to do anywhere, even with Node.js 111"
  const html ="<strong>You have been selected for nodejs position in my company</strong> 123"
  const SendMultipleEmailOption: ISendMultipleEmail = {
    to: to,
    subject: subject,
    text: text,
    html: html,
  }
 
  sendEmail.sendMultipleEmails(SendMultipleEmailOption)
  const SendEmailValidate = SendMultipleEmailValidate(SendMultipleEmailOption)
  if(SendEmailValidate.success){
    sendEmail.sendMultipleEmails(SendMultipleEmailOption)
  }else{
    console.log(SendEmailValidate.message)
  }
}