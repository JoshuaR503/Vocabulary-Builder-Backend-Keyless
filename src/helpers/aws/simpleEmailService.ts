import InterfaceUser from '../../lib/interfaces/user.interface';
import { WelcomeEmail, GoodByeEmail } from './templates/emails';
import { app_email } from './templates/constants';
import { SES } from 'aws-sdk';

const ses = new SES();

// Email delivery though AWS SES.
const emailService = (data: InterfaceUser, type: string): void => {

    // Settings parameters.
    const params: SES.SendEmailRequest = {
        Source: app_email,
        Destination: {
           ToAddresses: [data.email]
        },
        Message: {
           Subject: {
               Charset: 'UTF-8',
               Data: 'Information about your account.'
            },
            Body: {
               Html: type === 'creation' 
               ?  WelcomeEmail(data) 
               :  GoodByeEmail(data),
            }
        }
    };
 
    ses
    .sendEmail(params)
    .promise();
}

// Export function.
export default emailService;
