import { Word } from '../../../models';

import InterfaceWord from '../../../interfaces/word.interface';
import { sentryExeption } from '../../../../helpers';
import { translationService } from '../../../../helpers/aws.index';
import { 
    buildSpanishSpeech, 
    multipleAduioHandler, 
    buildEnglishSpeech 
} from '../../../../helpers/audio';

/**
 * Create a document
 * @param data 
 * @param writterId 
 */
const createWordService = async(data: any, writterId: string) => {
    return await documentHandler(data, writterId)
    .then(document => document)
    .catch((error) => sentryExeption(error));
}

/**
 * Handle document creation.
 * @param data 
 * @param writerId 
 */
const documentHandler = async (data: any, writerId: string) => {

    // Words.
    const wordEnglish: string = data.EN.word;
    const wordSpanish: string = data.ES.word;

    // Synonyms and Antonyms.
    const synonymsEnglish = data.EN.synonyms || null;
    const antonymsEnglish = data.EN.antonyms || null;

    // Synonyms and Antonyms translated.
    const synonymsSpanish = await translationService(synonymsEnglish);
    const antonymsSpanish = await translationService(antonymsEnglish);
    
    // Create a new word.
    const word: InterfaceWord = new Word({

        // English section.
        EN: {
           word: wordEnglish,
           wordPronuntiation: await buildEnglishSpeech(wordEnglish),

           firstPerson: data.EN.firstPerson,
           secondPerson: data.EN.secondPerson,
           thirdPerson: data.EN.thirdPerson,

           firstPersonPlural: data.EN.firstPersonPlural,
           secondPersonPlural: data.EN.secondPersonPlural,
           thirdPersonPlural: data.EN.thirdPersonPlural,

           past: data.EN.past,
           root: data.EN.root,
           present: data.EN.present,

           synonyms: synonymsEnglish,
           antonyms: antonymsEnglish,

           examples: data.EN.examples,
           note: data.EN.note,

           category: data.EN.category,
           definition: data.EN.definition,
        },

        // Spanish section.
        ES: {
           word: wordSpanish,
           wordPronuntiation: await buildSpanishSpeech(wordEnglish, wordSpanish),

           firstPerson: data.ES.firstPerson,
           secondPerson: data.ES.secondPerson,
           thirdPerson: data.ES.thirdPerson,

           firstPersonPlural: data.ES.firstPersonPlural,
           secondPersonPlural: data.ES.secondPersonPlural,
           thirdPersonPlural: data.ES.thirdPersonPlural,

           past: data.ES.past,
           root: data.ES.root,
           present:  data.ES.present,

           synonyms: synonymsSpanish,
           antonyms: antonymsSpanish,

           examples: await translationService(data.EN.examples),
           note:  await translationService(data.EN.note),

           category: await translationService(data.EN.category),
           definition: await translationService(data.EN.definition),
        },

        // Visibility false by default.
        visible: false,

        // Extra data.
        gif: data.gif,
        target: data.target,
        level: data.level,
        writter: writerId,
    });

    // Create audio files in English and Spanish.
    const responseEN = await multipleAduioHandler(wordEnglish, 'en', synonymsEnglish, antonymsEnglish);
    const responseES = await multipleAduioHandler(wordEnglish, 'es', synonymsSpanish, antonymsSpanish);

    // Log response.
    console.log('\n\n', responseEN, responseES, '\n\n',);

    // Save file.
    return word.save();
};

export default createWordService;
