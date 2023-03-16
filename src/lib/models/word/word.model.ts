import mongoose, { Schema } from "mongoose";
import InterfaceWord from "../../interfaces/word.interface";

const levels: object = {
   values: ['easy', 'medium', 'hard'],
   message: '{VALUE} is not a valid level.'
}

const targets: object = {
   values: ['all', 'es', 'en'],
   message: '{VALUE} is not a valid level.'
}

const schema: Schema = new Schema({

   EN: {
      // Word Data.
      word: {
         type: String,
         required: true,
      },

      wordPronuntiation: {
         type: String,
         required: false,
      },

      // Verb Conjuation English
      firstPerson: {
         type: String,
         required: false,
      },
      secondPerson: {
         type: String,
         required: false,
      },
      thirdPerson: {
         type: String,
         required: false,
      },


      firstPersonPlural: {
         type: String,
         required: false,
      },
      secondPersonPlural: {
         type: String,
         required: false,
      },
      thirdPersonPlural: {
         type: String,
         required: false,
      },

      past: {
         type: String,
         required: false,
      },
      root: {
         type: String,
         required: false,
      },
      present: {
         type: String,
         required: false,
      },

      // Related Words English
      synonyms: {
         type: String,
         required: false,
         lowercase: true,
      },
      antonyms: {
         type: String,
         required: false,
         lowercase: true,
      },

      // Extra Data Enlgish
      examples: {
         type: String,
         required: false,
      },
      note: {
         type: String,
         required: false,
      },

      category: {
         type: String,
         required: false,
         lowercase: true,
      },
      definition: {
         type: String,
         required: false,
      },
   },

   ES: {
       // Word Data.
       word: {
         type: String,
         required: true,
      },

      wordPronuntiation: {
         type: String,
         required: false,
      },
      
      // Verb Conjuation Spanish
      firstPerson: {
         type: String,
         required: false,
      },
      secondPerson: {
         type: String,
         required: false,
      },
      thirdPerson: {
         type: String,
         required: false,
      },

      firstPersonPlural: {
         type: String,
         required: false,
      },
      secondPersonPlural: {
         type: String,
         required: false,
      },
      thirdPersonPlural: {
         type: String,
         required: false,
      },

      past: {
         type: String,
         required: false,
      },
      root: {
         type: String,
         required: false,
      },
      present: {
         type: String,
         required: false,
      },

      // Related Words Spanish
      synonyms: {
         type: String,
         required: false,
         lowercase: true,
      },
      antonyms: {
         type: String,
         required: false,
         lowercase: true,
      },

      // Extra Data Spanish
      examples: {
         type: String,
         required: false,
      },
      note: {
         type: String,
         required: false,
      },

      category: {
         type: String,
         required: false,
         lowercase: true,
      },
      definition: {
         type: String,
         required: false,
      },
   },

   // Meda Data
   target: {
      type: String,
      enum: targets,
      default: 'all',
      required: false
   },

   gif: {
      type: String,
      required: false
   },

   level: {
      type: String,
      enum: levels,
      default: 'medium',
      required: false
   },

   visible: {
      type: Boolean,
      default: false
   },

   writter: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
   },
   
}, {timestamps: true});

export const model = mongoose.model<InterfaceWord>('Word', schema);
export default model;
