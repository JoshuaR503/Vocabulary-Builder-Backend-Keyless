import { Word } from '..';
import InterfaceWord from '../../interfaces/word.interface';

const hiddenData: string = '-writter -createdAt -updatedAt';

enum Levels {
    'easy',
    'medium',
    'hard'
}

enum Category {
    'Noun',
    'Verb',
    'Adverb',
    'Adjective',
    'Phrasal verb',
    'Idiom',
}

export {
    Word,
    Levels,
    Category,
    hiddenData,
    InterfaceWord,
};
