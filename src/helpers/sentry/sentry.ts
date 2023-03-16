import * as Sentry from '@sentry/node';

/**
 * Exeption Capture.
 * @param error 
 */
const sentryExeption = (error: any) => {
    Sentry.captureException(error);
}

/**
 * Message Capture.
 * @param message 
 * @param level 
 */
const sentryMessage = (message: string, level?: Sentry.Severity) => {
    Sentry.captureMessage(message, level);
}

// Export functions.
export {
    sentryExeption,
    sentryMessage,
}