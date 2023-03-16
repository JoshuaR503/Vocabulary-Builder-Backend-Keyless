import lambdaHelper from '../libs/http';

// Required constants.
import { kSpeechFunctionGeneratorName } from './constants';

// English Speech helper.
const buildEnglishSpeech = async (word: string): Promise<string> => {
    
    // Lambda API URL.
    const url: string = `${kSpeechFunctionGeneratorName}?lang=en`;

    // Data to send.
    const data: object = { en: word };

    // Make HTTP request and return response.
    return await lambdaHelper(url, data);
};

// Spanish Speech helper.
const buildSpanishSpeech = async (englishWord: string, spanishWord: string): Promise<string> => {

    // Lambda API URL.
    const url: string = `${kSpeechFunctionGeneratorName}?lang=es`;

    // Data to send.
    const data: object = { 
        en: englishWord,
        es: spanishWord
    };

    // Make HTTP request and return response.
    return await lambdaHelper(url, data);
};

// Export functions.
export {
    buildEnglishSpeech,
    buildSpanishSpeech
};
