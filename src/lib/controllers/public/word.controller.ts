import { Request, Response } from 'express';
import { success, error } from '../../../utils/http-responses';

import { InterfaceWord } from '../../models/word/word';
import { 
    levelHandler, 
    visibleHandler, 
    categoryHandler, 
    verbsHandler, 
    visibleRandomHandler
} from './word.handler';

import { DEFAULT_SKIP, DEFAULT_LIMIT } from '../../../utils/keys/seed';

/**
 * Returns all documents from the word collection
 * that have the value visible set to true.
 * @param request 
 * @param response 
 */
const findRandomized = async (request: Request, response: Response) => {
    const skip: number = Number(request.query.skip) || DEFAULT_SKIP;
    const limit: number = Number(request.query.limit) || DEFAULT_LIMIT;

    return visibleRandomHandler(skip, limit)
    .then((data) => success(response, 200, data))
    .catch((err) => error(response, 500, err.message));
}

/**
 * Returns all documents from the word collection
 * that have the value visible set to true.
 * @param request 
 * @param response 
 */
const findAll = async (request: Request, response: Response) => {
    const skip: number = Number(request.query.skip) || DEFAULT_SKIP;
    const limit: number = Number(request.query.limit) || DEFAULT_LIMIT;

    return visibleHandler(skip, limit)
    .then((data) => success(response, 200, data))
    .catch((err) => error(response, 500, err.message));
}

/**
 * Returns all documents from the word collection
 * that have the value visible set to true and a
 * dificulty level (easy, medium, hard).
 * @param request 
 * @param response 
 */
const findAllWithLevel = (request: Request, response: Response) => {

    const skip: number = Number(request.query.skip) || DEFAULT_SKIP;
    const limit: number = Number(request.query.limit) || DEFAULT_LIMIT;
    const level: string = request.params.level;
    let promise: Promise<InterfaceWord>;

    switch (level) {
        case 'easy':
            promise = levelHandler(skip, limit, 'easy');
            break;
        case 'medium':
            promise = levelHandler(skip, limit, 'medium');
            break;
        case 'hard':
            promise = levelHandler(skip, limit, 'hard');
            break;
        default:
            return error(response, 500, 'Data Missing: level');
    }

    return promise
    .then((data) => success(response, 200, data))
    .catch((err) => error(response, 500, err.message));
}

/**
 * Returns all documents from the word collection 
 * that have the value visible set to true and a
 * gramatical category ('nouns', 'verbs', 'adverbs', 'adjectives', 'phasal_verbs', 'idioms').
 * @param request 
 * @param response 
 */
const findAllWithCategory = (request: Request, response: Response) => {

    const skip: number = Number(request.query.skip) || DEFAULT_SKIP;
    const limit: number = Number(request.query.limit) || DEFAULT_LIMIT;
    const category: string = request.params.category.toLowerCase();

    let promise: Promise<InterfaceWord>;

    switch (category) {
        case 'nouns':
            promise = categoryHandler(skip, limit, 'noun');
            break;
        case 'verbs':
            promise = categoryHandler(skip, limit, 'verb');
            break;

        case 'verbose':
            promise = verbsHandler(skip, limit);
            break;

        case 'adverbs':
            promise = categoryHandler(skip, limit, 'adverb');
            break;
        case 'adjectives':
            promise = categoryHandler(skip, limit, 'adjective');
            break;
        case 'phrasal_verbs':
            promise = categoryHandler(skip, limit, 'phrasal verb');
            break;
        case 'idioms':
            promise = categoryHandler(skip, limit, 'idiom');
            break;
        default:
            return error(response, 500, `${category} did not match any known categories`);
    }

    return promise
    .then((data) => success(response, 200, data))
    .catch((err) => error(response, 500, err.message));
}

export {
    findAll,
    findRandomized,
    findAllWithLevel,
    findAllWithCategory,
}
