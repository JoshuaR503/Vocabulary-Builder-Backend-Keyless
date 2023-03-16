# Vocabulary Builder Server

This is the new Server for QuickGlish written using TypeScript.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a2314469afdc4606a70080fda38f7176)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JoshuaR503/Vocabulary-Builder-Server&amp;utm_campaign=Badge_Grade)

## Error Handling
Currently, the only error handling are `.then & .catch`. Any stack error related will be reported to Sentry.

## Installation Instructions
Simply run `npm run install`.
When all dependencies have been download `npm run serve`.

## Auth Middlewares
All the middlewares will be found in `src\middlewares`. Currently, there are 2 main middlewares `guard` and `token`. Guard is meant to verify the user's role and see if they have permission to make Update and Delete operations. Token is meant to verify and create tokens that then transport data and are used throught the server.

## Features
Currently, the server is meant to be simple. It has a few AWS dependencies but that's it. Reusable components can be found in `src/helpers`.

### User
- User login
- User password reset
- User creation, read, update and delete
- User Token generation
- User on created and on deleted email sending with AWS SES
- Joi data authentication
- Pagination

### Words
- Word creation, read, update and delete
- Word audio creation with AWS polly, Lambda, Translation, and S3
- Joi data authentication
- Pagination

### Search
- Global search
- Search on a single collection
