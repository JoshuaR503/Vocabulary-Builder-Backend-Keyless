import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routing";
import wordsRouter from "./word/word.routing";
import searchRouter from "./search/search.routing";
import wordsPublicRouter from './public/words.routing';
import sentryRouter from './api/sentry.routing';
import publicSearchRouter from "./public_search/search.routing";
import feedbackRouter from './feedback/feedback.routing';

export {
    authRouter,
    userRouter,
    wordsRouter,
    searchRouter,
    wordsPublicRouter,
    sentryRouter,
    publicSearchRouter,
    feedbackRouter
};
