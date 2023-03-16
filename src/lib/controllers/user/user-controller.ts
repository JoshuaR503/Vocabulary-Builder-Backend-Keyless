import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { success, error } from '../../../utils/http-responses';
import { emailService } from '../../../helpers/aws.index';
import { SALT_ROUNDS } from '../../../utils';
import { User } from '../../models';

export default class UsersController {

   /**
    * Counts all the users in the database.
    * @param request 
    * @param response 
    */
   public async countAll(request: Request, response: Response) {
      return await User
      .estimatedDocumentCount()
      .then((count) => success(response, 200, count))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Retuns all users without the encrypted password.
    * @param request 
    * @param response 
    */
   public async findAll(request: Request, response: Response) {

      const skip: number = Number(request.query.skip);
      const limit: number = Number(request.query.limit);
      const count: number = await User.estimatedDocumentCount();

      return await User
      .find({}, '-password')
      .skip(skip)
      .limit(limit)
      .sort({createdAt: 'desc'})
      .then((document) => success(response, 200, {count, document}))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Returns a single user without the encrypted password. 
    * @param request 
    * @param response 
    */
   public async findOne(request: Request, response: Response) {

      const id: string = String(request.params.id);

      return await User
      .findById(id, '-password')
      .then((document) => success(response, 200, document))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Creates and return a new user.
    * @param request 
    * @param response 
    */
   public async create(request: Request, response: Response) {

      const data = request.body;

      // Brand new user.
      const user = new User({
         name: data.name.trim(),
         email: data.email.trim(),
         password: bcrypt.hashSync(data.password, SALT_ROUNDS),
         role: data.role,
         verified: false,
      });

      // Replace encrypted password.
      const emailUser = user;

      // Save final user.
      return user
      .save()
      .then((document) => {
         
         emailUser.password = data.password;

         // Send a notice email.
         emailService(emailUser, 'creation');
         // Server response
         success(response, 201, { message: 'User successfully created.', document});
      })
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Updates and returns an existing user.
    * @param request 
    * @param response 
    */
   public async update(request: Request, response: Response) {
      
      const data = request.body;
      const id: string = String(request.params.id);

      const body = {
         name: data.name,
         email: data.email,
         role: data.role
      };

      return User
      .findByIdAndUpdate(id, body)
      .then(() => success(response, 204, null))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Deletes an existing user and sends a notice emial.
    * @param request 
    * @param response 
    */
   public async delete(request: Request, response: Response) {
      
      const id: string = String(request.params.id);

      return await User
      .findByIdAndRemove(id)
      .then(document => {

         // Send email notice.
         emailService(document, 'delete');
         
         // Send success response.
         success(response, 202, {
            message: 'User deleted Successfully',
            document
         });
      })
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Deletes all documents on the users collection.
    * This is not meant to be used in production.
    * @param request 
    * @param response 
    */
   public async deleteMany(request: Request, response: Response) {
      return await User
      .deleteMany({})
      .then((document) => success(response, 200, document.n))
      .catch((err) => error(response, 500, err.message));
   }
   
}
