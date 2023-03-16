import RateLimit from 'express-rate-limit';

// Rate limit.
const rateLimitMiddleware = new RateLimit({
    max: 5, // limit each IP to 200 requests per windowMs
    windowMs: 300000, // 5 minutes
    message: 'Too many requests have been made.', // Custom message
});

export {
    rateLimitMiddleware
}