import { Request, Response, NextFunction } from 'express';
import { TOKEN_SEED } from '../../../utils';
import { verify } from 'jsonwebtoken';

const upperPermission = 'UpperPermission';
const lowerPermission = 'LowerPermission';
const message = "You need permission to perform this action on the server";

/**
 * Check if the user is verified
 * @param request 
 * @param response 
 * @param next 
 */
const authenticateVerification = (request: Request, response: Response, next: NextFunction) => {

    try {
        const token = request.header('x-authorization-token');
        const payload: any = verify(token, TOKEN_SEED);

        if (payload.document.verified) {
            // Proceed
            next();
        } else {
            throw 'User is not verified';
        }

    } catch (error) {
        return response.status(403).json({
            type: 'PermissionExeption',
            message,
            error
        });
    }
}

/**
 * Authenticate if user has Upper or Lower Permission.
 * @param request 
 * @param response 
 * @param next 
 */
const authenticatePermission = (request: Request, response: Response, next: NextFunction) => {

    try {
        const token = request.header('x-authorization-token');
        const payload: any = verify(token, TOKEN_SEED);

        if (payload.document.role === upperPermission ||
            payload.document.role === lowerPermission ) {
            // Proceed
            next();
        } else {
            throw 'PermissionExeption';
        }

    } catch (error) {
        return error(response, 403, {
            type: 'PermissionExeption',
            message,
            error
        });
    }
}

/**
 * Authenticate if user has Upper Permission.
 * @param request 
 * @param response 
 * @param next 
 */
const authenticateUpperPermission = (request: Request, response: Response, next: NextFunction) => {

    try {
        const token = request.header('x-authorization-token');
        const payload: any = verify(token, TOKEN_SEED);

        if (payload.document.role === upperPermission) {
            // Proceed
            next();
        } else {
            throw 'PermissionExeption';
        }

    } catch (error) {
        return response.status(403).json({
            type: 'PermissionExeption',
            message,
            error
        });
    }
}

export {
    authenticatePermission,
    authenticateUpperPermission,
    authenticateVerification,
}
