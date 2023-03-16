import { Word } from '../../models';
import { hiddenData, InterfaceWord } from '../../models/word/word';
import { sentryExeption } from '../../../helpers';

/**
 * Searches words in Spanish
 * @param $regex 
 */
const searchAll = ($regex: RegExp) :Promise<InterfaceWord> => {
    return new Promise((resolve, reject) => {

        Word
        .find({}, hiddenData)
        .or([
            {'ES.word': $regex }, 
            {'EN.word': $regex},
        ])
        .where('visible', true)
        .sort({"ES.category": 'desc'})
        .sort({createdAt: 'desc'})
        .exec((error, response: InterfaceWord) => {
            
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
    searchAll
}
