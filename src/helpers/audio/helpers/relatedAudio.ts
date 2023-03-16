import lambdaHelper from '../libs/http';

// Required constants.
import { kSpeechMultipleAduioName } from './constants';

// Speech helper.
const buildMultipleAduio = async (words: string, wordParent: string, langCode: string) => {

    // Lambda API URL.
    const url: string = `${kSpeechMultipleAduioName}?lang=${langCode}`;

    // Checks to ensure data integrity.
    const validWords: boolean = words !== null;
    const validParent: boolean = wordParent !== null;

    // If data is valid.
    if (validWords && validParent) {
        
        // Make HTTP request and return response.
        return await lambdaHelper(url, {
            words: words,
            parentWord: wordParent
        });
    }
};

// Multiple aduio handler.
const multipleAduioHandler = async(
    wordParent: string, langCode: string,
    synonyms?: any, antonyms?: any
) => {

    // API Endpoint URL.
    const url: string = `${kSpeechMultipleAduioName}?lang=${langCode}`;

    // Checks to ensure data integory.
    const validSynonyms: boolean = synonyms !== null;
    const validAntonyms: boolean = antonyms !== null;

    // If we have valid synonyms and antonyms.
    if (validSynonyms && validAntonyms) {
        // Make HTTP request and return response.
        return await lambdaHelper(url, {
            words: `${synonyms}, ${antonyms}`,
            parentWord: wordParent
        });
    }
    
    // If we only have valid synonyms.
    else if (validSynonyms) {
        // Make HTTP request and return response.
        return await lambdaHelper(url,  {
            words: synonyms,
            parentWord: wordParent
        });
    }

    // If we only have valid antonyms.
    else if (validAntonyms) {
        // Make HTTP request and return response.
        return await lambdaHelper(url, {
            words: antonyms,
            parentWord: wordParent
        });
    }
};

// Export function.
export {
    buildMultipleAduio,
    multipleAduioHandler
};
