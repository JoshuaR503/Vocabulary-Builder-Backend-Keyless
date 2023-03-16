import InterfaceUser from '../../../lib/interfaces/user.interface';
import templateHandler from './core/template';

import { tableBodyStyle } from './core/styles';
import { app_owner, app, app_link } from './constants';

// This will create an email template.
const created = (data: InterfaceUser): string => {

  // Email title.
  const title: string = 'Welcome to Vocabulary Builder';
    
  // Show user role.
  const role: string = data.role === 'LowerPermission' ? 'Editor' : 'Admin';

  // Template.
  const body: string = `
  <tr>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
      <p style="font-family: sans-serif; font-size: 18px; font-weight: bold; margin: 0; Margin-bottom: 15px;">Welcome ${data.name},</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
        You've been invited by ${app_owner} to be part of ${app}. You will need these credentials to login. <b>Make sure to change the default password.</b>
      </p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 5px;"> <b>Email:</b> ${data.email} </p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 5px;"> <b>Password:</b> ${data.password} </p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"> <b>Role:</b> ${role}</p>
      <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
        <tbody>
          <tr>
            <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                <tbody>
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> 
                      <a href="${app_link}" target="_blank" style="${tableBodyStyle}">Start</a> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>`;

  return templateHandler(title, body);
} 

// Export function.
export default created;