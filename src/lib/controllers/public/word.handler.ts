import { NativeError } from 'mongoose';
import { sentryExeption } from '../../../helpers';
import { Word, hiddenData,  InterfaceWord, } from '../../models/word/word';

/**
 * Level Handler. Returns the count of all the 
 * documents from the word collection that match
 * a specific category.
 * @param max 
 */
const generateRandomNumber = (max: number): number => {

    const randomNumber = Math.floor((Math.random() * max));
    const ran = 
    randomNumber > max || 
    randomNumber == max || 
    randomNumber === 0 ? 0 : randomNumber; 

    return ran;
}

/**
 * Visibility Random Handler. Returns all the documents from 
 * the word collection that have the value 'visible' 
 * set to true in a randomized way.
 * @param skip 
 * @param limit
 */
const visibleRandomHandler = async (skip: number, limit: number) => {

    const documentCount = await documentCounter();
    const randomNumber = generateRandomNumber(documentCount); 

    return await Word
    .find({}, hiddenData)
    .skip(randomNumber)
    .limit(limit)
    .where('visible', true)
    .sort({createdAt: 'desc'})
}

/**
 * Visibility Handler. Returns all the documents from 
 * the word collection that have the value 'visible' 
 * set to true. 
 * @param skip 
 * @param limit
 */
const visibleHandler = (skip: number, limit: number): Promise<InterfaceWord> => {
    return new Promise((resolve, reject) => {
        Word
        .find({}, hiddenData)
        .skip(skip)
        .limit(limit)
        .where('visible', true)
        .sort({createdAt: 'desc'})
        .exec((error: NativeError, response: InterfaceWord) => {

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
 * Level Handler. Returns all the documents from 
 * the word collection that match the level sent
 * from the calling function. 
 * @param skip 
 * @param limit 
 * @param level 
 */
const levelHandler = (skip: number, limit: number, level: String): Promise<InterfaceWord> => {
    return new Promise((resolve, reject) => {
        Word
        .find({}, hiddenData)
        .skip(skip)
        .limit(limit)
        .where('level', level)
        .where('visible', true)
        .sort({createdAt: 'desc'})
        .exec((error: NativeError, response: InterfaceWord) => {

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
 * Level Handler. Returns the count of all the 
 * documents from the word collection that match
 * a specific category.
 * @param category
 */
const categoryCounter = async (category: String): Promise<number> => {
    return await Word
    .find({'EN.category': category})
    .countDocuments();
}

/**
 * Level Handler. Returns the count of all the 
 * documents from the word collection that match
 * a specific category.
 * @param category
 */
const documentCounter = async (): Promise<number> => {
    return await Word
    .countDocuments();
}

/**
 * Category Handler. Returns all the documents from 
 * the word collection that match the category sent
 * from the calling function. 
 * @param skip 
 * @param limit 
 * @param level 
 */
const categoryHandler = (skip: number, limit: number, category: String): Promise<InterfaceWord> => {

    return new Promise(async (resolve, reject) => {

        const documentCount = await categoryCounter(category);
        const randomNumber = generateRandomNumber(documentCount);

        Word
        .find({ "EN.category": category}, hiddenData)
        .skip(randomNumber)
        .limit(limit)
        .where('visible', true)
        .sort({"EN.category": 'desc'})
        .sort({createdAt: 'desc'})
        .exec((error: NativeError, response: InterfaceWord) => {
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
 * Verb Custom Handler. Returns all the documents from 
 * the word collection that have the category of 'verb' 
 * and 'phasal verb.'
 * @param skip 
 * @param limit 
 * @param level 
 */
const verbsHandler = (skip: number, limit: number): Promise<InterfaceWord> => {

    return new Promise(async (resolve, reject) => {

        const verbsCount = await categoryCounter('verb');
        const phasalCount = await categoryCounter('phrasal verb');
        const randomNumber = generateRandomNumber(verbsCount + phasalCount);

        Word
        .find({}, hiddenData)
        .or([
            {'EN.category': 'verb'},
            {'EN.category': 'phrasal verb'},
        ])
        .skip(randomNumber)
        .limit(limit)
        .where('visible', true)
        .sort({"EN.category": 'desc'})
        .sort({createdAt: 'desc'})
        .exec((error: NativeError, response: InterfaceWord) => {

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
    categoryHandler,
    verbsHandler,
    visibleHandler,
    levelHandler,
    visibleRandomHandler
}
