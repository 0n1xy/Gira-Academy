import { SendGridService } from '@/services/SendGrid_Service';
import { MailerSendService } from '@/services/MailerSend_Service';
import { ISendEmail,ISendMultipleEmail } from '@/types/SendMail_Interface';

export class SendMailService {
  private sendGridService: SendGridService;
  private mailerSendService: MailerSendService;

  constructor() {
    this.sendGridService = new SendGridService();
    this.mailerSendService = new MailerSendService();
  }

  public async sendOneEmail(options: ISendEmail): Promise<{success: boolean}>{
    const sendGridData = await this.sendGridService.sendOneEmail(options)  
    if (sendGridData.success) {
      return {success: true}
    }else{
        const mailerSendData = await this.mailerSendService.sendOneEmail(options)
        if (mailerSendData.success){
            return {success: true}
        }else{
            return {success: false}
        }
    }
  }
  public async sendMultipleEmails(options: ISendMultipleEmail):Promise<{success: boolean}>{
    const sendGridData = await this.sendGridService.sendMultipleEmail(options) 
    if (sendGridData.success) {
      return {success: true}
    }else{
      return {success: false}
    }
  }
 
}