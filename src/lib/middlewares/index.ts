import { rateLimitMiddleware } from './routes/rate-limit';
import { tokenVerification, tokenGeneration } from './token/token';
import { 
    authenticatePermission,
    authenticateUpperPermission, 
    authenticateVerification
} from './guard/roles';

const commonMiddleware = [
    tokenVerification, 
    authenticateVerification, 
    authenticatePermission
];

const upperMiddleware = [
    tokenVerification, 
    authenticateVerification,
    authenticatePermission,
    authenticateUpperPermission
];

export {
    commonMiddleware,
    upperMiddleware,
    tokenGeneration,
    rateLimitMiddleware,
}


