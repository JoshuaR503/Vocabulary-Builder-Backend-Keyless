import { Document } from "mongoose";

export default interface InterfaceWord extends Document {

   EN?: { 
      // Word data
      word?: string,
      wordPronuntiation?: string,

      // Verb Conjuation
      firstPerson?: string,
      secondPerson?: string,
      thirdPerson?: string,

      firstPersonPlural?: string,
      secondPersonPlural?: string,
      thirdPersonPlural?: string,

      past?: string,
      root?: string,
      present?: string,

      // Related Words
      synonyms?: string,
      antonyms?: string,

      // Extra Data
      examples?: string,
      note?: string,
      category?: string,
      definition?: string,
   },

   ES?: {
      // Word data
      word?: string,
      wordPronuntiation?: string,
      
      // Verb Conjuation
      firstPerson?: string,
      secondPerson?: string,
      thirdPerson?: string,

      firstPersonPlural?: string,
      secondPersonPlural?: string,
      thirdPersonPlural?: string,

      past?: string,
      root?: string,
      present?: string,

      // Related Words
      synonyms?: string,
      antonyms?: string,

      // Extra Data
      examples?: string,
      note?: string,
      category?: string,
      definition?: string,
   },

   // config data
   gif?: string,
   target: string,
   level: string,
   visible: boolean,
   writer: string,
}
