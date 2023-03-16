import axios from 'axios';
import { sentryExeption } from '../..';
import { AWS_KEY, AWS_URL_SERVICE } from '../../../utils';

const urlServices = AWS_URL_SERVICE;
const headers = {
   'Content-Type': 'application/json',
   'x-api-key': AWS_KEY,
}

/**
 * Updates word's audio file.
 * @param word 
 */
const buildPronunctiation = (word: string): Promise<string> => {
   const url = `${urlServices}CelestiaSingleAudioGenerator?lang=en`;
   const data = { en: word };

   try {
      return axios
      .post(url, data, {headers: headers})
      .then((response) => response.data.data);
   } catch (error) {
      console.log(error);
   }
};

/**
 * Updates word's translation audio file.
 * @param word 
 * @param translation 
 */
const buildTranslationPronuntiation = (word: string, translation: string): Promise<string> => {
   
   const lambda = 'CelestiaSingleAudioGenerator'
   const url = `${urlServices}${lambda}?lang=es`;
   const data = { 
      en: word,
      es: translation
   }

   try {
      return axios
      .post(url, data, {headers: headers})
      .then((response) => {

         console.log(response.data.data);

         return response.data.data;
      });
   } catch (error) {
      console.log(error);
   }
}

/**
 * Creates multiple audio files.
 * @param arr1 
 * @param arr2 
 * @param parent 
 * @param lang 
 */
const createMultipleAudios = (
   arr1: string, 
   arr2: string, parent: string, lang: string ) => {
   
   const lambda = 'GenesisAudioFiles'
   const url = `${urlServices}${lambda}?lang=${lang}`;

   if (arr1 && arr2) {

      const string = `${arr1}, ${arr2}`;
      const data = {
         words: string,
         parentWord: parent
      }

      return response(url, data);

   } else if (arr1) {

      const data = {
         words: arr1,
         parentWord: parent
      }

      return response(url, data);

   } else if (arr2) {
      
      const data = {
         words: arr2,
         parentWord: parent
      }

      return response(url, data);
   }
}

/**
 * Deletes a single audio file.s
 * @param word 
 */
const deleteAudio = (word: string) => {
   const lambda = 'CelestiaDeleteAudio'
   const url = `${urlServices}${lambda}?fileName=${word}`;

   try {
      return axios
      .post(url, {headers: headers})
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error)); 
   } catch (error) {
      throw error;
   }
}

/**
 * Audio Generation.
 * @param words 
 * @param parent 
 * @param lang 
 */
const audios = (words: string, parent: string, lang: string ) => {
   const lambda = 'GenesisAudioFiles'
   const url = `${urlServices}${lambda}?lang=${lang}`;

   // Make sure it's not empty
   if (words) {
      const data = {
         words: words,
         parentWord: parent
      }

      return response(url, data);   
   }
}

/**
 * Sends http request to a Lamdba function.
 * @param url 
 * @param data 
 */
const response = (url: string, data: object) => {
   return axios
   .post(url, data, {headers: headers})
   .then((response) => console.log(response.data))
   .catch((error) => sentryExeption(error));
}

export {
   buildPronunctiation,
   buildTranslationPronuntiation,
   createMultipleAudios,
   audios,
   deleteAudio
}