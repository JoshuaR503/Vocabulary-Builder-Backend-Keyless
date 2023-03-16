import InterfaceUser from '../../../lib/interfaces/user.interface';
import templateHandler from './core/template';

import { app } from './constants';

// This will create an email template.
const deleted = (data: InterfaceUser) => {
  
  // Email title.
  const title: string = 'Your account has been deleted.s';
  
  // HTML template.
  const template = 
  `<tr>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
      <p style="font-family: sans-serif; font-size: 18px; font-weight: bold; margin: 0; Margin-bottom: 15px;">${data.name},</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
        Your account has been deleted and you will lose your access to ${app}.
      </p>
    </td>
  </tr>`;

  // Return HTML template
  return templateHandler(title, template);
} 

// Export function.
export default deleted;