import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../../models';
import { sentryExeption } from '../../../helpers';
import { tokenGeneration } from '../../middlewares';
import { SALT_ROUNDS } from '../../../utils';

export default class AuthenticationController {
   /**
    * Login method.
    * @param request 
    * @param response 
    */
   public async login(request: Request, response: Response) {
      
      const data = request.body;
      const email = data.email;
      const password = data.password;

      if (!email || !password) {
         // Return error message
         return response.status(500).json({
            success: false,
            message: 'You must enter valid data.',
         });
      }

      return await User
      .findOne({email: email}, (error, document) => {

         if (error) {
            // Send exeption to sentry.
            sentryExeption(error);

            // Return error message
            return response.status(500).json({
               success: false,
               message: 'There was an unexpected error.',
            });
         }

         if (!document) {
            return response.status(500).json({
               success: false,
               message: 'These credentials do not exist.',
            });
         }

         if (!bcrypt.compareSync(password, document.password)) {
            return response.status(401).json({
               success: false,
               message: 'These credentials do not match our records.',
            });
         }

         document.password = null;

         const token = tokenGeneration(document);

         return response
         .status(200)
         .json({success: true, document, token});
      });
   }

   /**
    * Password Reset
    * @param request 
    * @param response 
    */
   public async password(request: Request, response: Response) {

      const data = request.body;
      const email = data.email;
      const oldPassword = data.oldPassword;
      const newPassword = data.newPassword;

      if (!email || !oldPassword) {
         // Return error message
         return response.status(400).json({
            success: false,
            message: 'You must enter valid data.',
         });
      }

      return await User
      .findOne({email}, (err, document) => {
  
         if (err || !document) {
            // Return error message
            return response.status(500).json({
               success: false,
               message: 'There was an unexpected error.',
            });
         }

         if (newPassword.length < 8) {
            // Return error message
            return response.status(400).json({
               success: false,
               message: 'Password must be greater than 8 digits',
            });
         }

         if (!bcrypt.compareSync(oldPassword, document.password)) {
            return response.status(401).json({
               success: false,
               message: 'These credentials do not match our records.',
            });
         } else {
            const id = document.id;
            const password = bcrypt.hashSync(newPassword, SALT_ROUNDS);
            const body = {
               verified: true,
               password: password 
            }

            User
            .findByIdAndUpdate(id, body)
            .then(() => response.status(204).json({
               success: false,
               message: 'Password reset sucess',
            }))
            .catch((error) => response.status(401).json({
               success: false,
               message: 'Failed to update user password',
               error,
            }));
         }
      });
   }
}
