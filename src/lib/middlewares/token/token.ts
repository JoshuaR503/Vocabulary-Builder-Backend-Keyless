import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { TOKEN_SEED } from '../../../utils';
import InterfaceUser from '../../interfaces/user.interface';

/**
 * Verify token's authenticity.
 * @param request 
 * @param response 
 * @param next 
 */
const tokenVerification = (request: Request,  response: Response,  next: NextFunction) => {

   try {
      const token = request.header('x-authorization-token');

      // Verify token authenticity.
      verify(token, TOKEN_SEED);

      // Proceed.
      next();
      
   } catch (error) {
      return response.status(403).json({
         type: 'OAuthException',
         message: "You don't have permission to access this resource on the server."
      });
   }
}

/**
 * Token generation
 * @param document 
 */
const tokenGeneration = (document: InterfaceUser): string => {
   const token: string = sign({document}, TOKEN_SEED, {expiresIn: '5 days'});

   return token;
}


export {
   tokenVerification,
   tokenGeneration
};