import { Word } from '../../../models';

import InterfaceWord from '../../../interfaces/word.interface';
import { sentryExeption } from '../../../../helpers';
import { 
   buildEnglishSpeech, 
   buildSpanishSpeech, 
   buildMultipleAduio 
} from '../../../../helpers/audio';

/**
 * Update document handler.
 * @param id 
 * @param data 
 */
const updateWordService = async (id: string, data: InterfaceWord) => {
   return await Word
   .findById(id)
   .then(document => documentHandler(document, data))
   .catch((error: any) => sentryExeption(error));
}

/**
 * Update only the audio files.
 * @param id 
 * @param data 
 */
const updateWordAudioService = async(id: string, data: InterfaceWord) => {
   return await Word
   .findById(id)
   .then(document => updateWordAudioHandler(data))
   .catch((error: any) => sentryExeption(error));
}

/**
 * Update document content hanlder.
 * @param document 
 * @param data 
 */
const documentHandler = async (document: InterfaceWord, data: InterfaceWord) => {
   // Check if there are any changes.
   if (document.EN.synonyms !== data.EN.synonyms) {
      // If there are changes it will create new audio files.
      await buildMultipleAduio(data.EN.synonyms, data.EN.word, 'en'); 
   }

   // Check if there are any changes.
   if (document.EN.antonyms !== data.EN.antonyms) {
      // If there are changes it will create new audio files.
      await buildMultipleAduio(data.EN.antonyms, data.EN.word, 'en'); 
   }

   // Check if there are any changes.
   if (document.ES.synonyms !== data.ES.synonyms) {
      // If there are changes it will create new audio files.
      await buildMultipleAduio(data.ES.synonyms, data.EN.word, 'es'); 
   }

   // Check if there are any changes.
   if (document.ES.antonyms !== data.ES.antonyms) {
      // If there are changes it will create new audio files.
      await buildMultipleAduio(data.ES.antonyms, data.EN.word, 'es'); 
   }

   // Update document content.
   document.ES = data.ES;
   document.EN = data.EN;
   
   // Meta data
   document.gif = data.gif;
   document.target = data.target;
   document.visible = data.visible;
   document.level = data.level;

   return document.save();
}

const updateWordAudioHandler = async (data: InterfaceWord) => {

   await updateWordAudio(data, 'en', data.EN.word);  
   await updateWordAudio(data, 'es', data.ES.word);
   
   return 'Sucess';
}

const updateWordAudio = async (word: InterfaceWord, lang: string, content: string,  ) => {
   return await Word
   .findById(word._id)
   .then(async (document) => {

      if (lang == 'en') {
         const en = await buildEnglishSpeech(content);

         document.EN.word = word.EN.word;
         document.EN.wordPronuntiation = en;

         return await document.save();
      }

      if (lang == 'es') {
         const es = await buildSpanishSpeech(word.EN.word, content);

         document.ES.word = word.ES.word;
         document.ES.wordPronuntiation = es;
         
         return await document.save();
      }
   });  
}

export {
   updateWordService,
   updateWordAudioService
};
