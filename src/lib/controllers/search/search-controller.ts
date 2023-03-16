import { Request, Response } from 'express';
import { sentryExeption } from '../../../helpers';
import { searchUser, searchWord } from './search-handler';

/**
 * Searches on a single collection.
 * @param request 
 * @param response
 * @returns response
 */
const searchCollection = (request: Request, response: Response) => {
    const search = request.query.search;
    const collection: string = request.params.collection;
    const regex = new RegExp(search, 'i');
    let func: Promise<any>;

    switch (collection) {
        case 'users':
            func = searchUser(regex);
            break;
        case 'words':
            func = searchWord(regex);
            break;
        default:
            return response.status(400).json({
                success: false,
                message: 'No results have been found.'
            });
    }

    return func
    .then((data) => {
        return response.status(200).json({
            success: true,
            [collection]: data
        })
    })
    .catch((error) => {
        // Send exeption to sentry.
        sentryExeption(error);

        // TODO: Report error.
        return response.status(400).json({
            success: false,
            message: 'No results have been found.'
        });
    })
}

/**
 * Searches all collections.
 * @param request 
 * @param response 
 */
const searchGlobal = (request: Request, response: Response) => {
    const search = request.query.search;
    const regex = new RegExp(search, 'i');
    
    return Promise.all([
        searchUser(regex),
        searchWord(regex)
    ])
    .then((data) => {
        return response.status(200).json({
            success: true,
            users: data[0],
            words: data[1]
        });
    })
    .catch((error) => {
        // Send exeption to sentry.
        sentryExeption(error);

        return response.status(500).json({
            success: false,
            message: 'No data found.',
        })
    });
}

export {
    searchGlobal,
    searchCollection,
}
