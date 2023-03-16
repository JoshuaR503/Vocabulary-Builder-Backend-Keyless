import { Response } from 'express';
import { sentryExeption } from '../helpers';

/**
 * Reusable function to send success responses.
 * @param response 
 * @param code 
 * @param data 
 */
const success = (response: Response, code: number, data: any) => {
   return response
   .status(code)
   .json({success: true, response: data});
}

/**
 * Reusable function to send error responses.
 * @param response 
 * @param code 
 * @param data 
 */
const error = (response: Response, code: number, data: any) => {

   console.log('There was an error', data, code);

   // Send exeption to sentry.
   sentryExeption(data);

   // Return friendly error message.
   return response
   .status(code)
   .json({success: false, response: 'There was an unknown error.'});
}

export {
   success,
   error
}
