import { Word } from "../models";
import { audios } from "../../helpers/audio/legacy/media.helper";

const deleteWhiteSpcaes = (text: string) => {
    return text.replace(/\s*,\s*/g, ',');
}

const replaceWhiteSpace = (text: string) => {
    return text.replace(/ /g,"-");
}


const cleanFileName = (text: string) => {
    return replaceWhiteSpace(text.trim());
}

const audiosHandler = async (dataArray: string, parent: string, lang: string) => {
    //await audios(dataArray, parent, lang);
 }

const loadDocuments = async () => {
    return await Word
    .find()
    .skip(160)
    .limit(10)
    .sort({createdAt: 'desc'})
    .populate('writter', 'name role')
    .then((documents) => documents);
}

const updateDocument = async (id: string, wordPronuntiationLink: string) => {
    await Word
    .findById(id)
    .then(document => {
        document.ES.wordPronuntiation = wordPronuntiationLink;
        document.save();
    });
}

const loadAll = async () => {

    const documents = await loadDocuments();

    documents.forEach((doc, index) => {

        console.log(`\n \x1b[0m ${doc.ES.wordPronuntiation}`);

        const esWord = doc.ES.word;
        const enWord = doc.EN.word;

        const cleanSpanish = cleanFileName(esWord);
        const cleanEnglish = cleanFileName(enWord);

        const fileName = `${cleanEnglish}-${encodeURI(cleanSpanish)}`;
        const wordPronuntiationLink = ""

        updateDocument(doc._id, wordPronuntiationLink);

        console.log(`\x1b[32m${wordPronuntiationLink}`);
    });
}


export default loadAll;
