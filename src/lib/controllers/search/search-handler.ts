import InterfaceUser from '../../interfaces/user.interface';
import InterfaceWord from '../../interfaces/word.interface';

import { sentryExeption } from '../../../helpers';
import { Word, User } from '../../models';

/**
 * Searches on the users collection and 
 * returns document matching [search].
 * @param search 
 * @returns An Array with documents.
 */
const searchUser = (search: RegExp) => {
    return new Promise((resolve, reject) => {
        User
        .find({}, 'name role email')
        .or([
            {'name': search},
            {'role': search},
            {'email': search}
        ])
        .exec((error: any, response: InterfaceUser) => {
            if (error) {
                // Send exeption to sentry.
                sentryExeption(error);
                // Reject promise.
                reject('No data found.');
            } else {
                resolve(response);
            }
        });
    });
}

/**
 * Searches on the words collection and 
 * retuns documents matching [search].
 * @param search 
 * @returns An array with documents.
 */
const searchWord = (search: RegExp) => {
    return new Promise((resolve, reject) => {
        Word
        .find({})
        .or([
            {'ES.word': search}, 
            {'EN.word': search},
            {'EN.category': search},
            {'EN.wordTranslation': search},
        ])
        .exec((error: any, response: InterfaceWord) => {
            if (error) {
                // Send exeption to sentry.
                sentryExeption(error);
                // Reject promise.
                reject('No data found.');
            } else {
                resolve(response);
            }
        });
    });
}

export {
    searchUser,
    searchWord
}
