// Required packages.
const AWS = require('aws-sdk');

// Services needed.
const S3 = new AWS.S3();
const polly = new AWS.Polly();

// Voices ids.
const kSpanishVoice = 'Lupe';
const kEnglishVoce = 'Matthew';

// Language codes.
const kSpanishLangCode = 'es';
const kEnglishLangCode = 'en';

// Hardcoded messages.
const kSuccessResponse = 'success';
const kMessageResponse = 'Resource successfully saved.';

// S3 storage bucket name.
const kBucketName = 'vocabulary-builder-sounds-bucket';

// Content Delivery Network URL.
const cdn = 'https://d25rf0p9nsb187.cloudfront.net';

// AWS Handler.
exports.handler = async (event) => {
    switch (event.lang) {
        // If the language code is Spanish.
        case kSpanishLangCode:

        // Retrun data to the API.
        return await createAndStoreSpanishAudio(event.en, event.es);

        // If the language code is English.
        case kEnglishLangCode:

        // Retrun data to the API.
        return await createAndStoreEnglishAudio(event.en);

        // If the language code is not 'en' or 'es', then return error.
        default: return {
            response: 'You forgot something!',
            message: 'No audio file will be created until you select a lang.',
            code: 'error',
        };
    }
};

// Create audio files with Polly, store them in S3, and, return location.
const createAndStoreEnglishAudio = async (word) => {

    // File name convention in English. 
    const fileName = replaceWhiteSpace(word);

    // File creation and storage.
    const audio = await createPollyAudio(word, kEnglishVoce);
    const fileUrl = await writeAudioStreamToS3(audio.AudioStream, fileName);

    // File location.
    const fileLocation = fileUrl.slice(58);
    const finalLocation = `${cdn}/${fileLocation}`;

    // Return data.
    return {
        code: kSuccessResponse,
        data: finalLocation,
        response: kMessageResponse,
    };
};

// Create audio files with Polly, store them in S3, and, return location.
const createAndStoreSpanishAudio = async (word, spanishWord) => {

    // Ensure that the word in English is not missing.
    if (!word) throw 'Word in English is missing.';
    
    // File naming convention in Spanish.
    const formattedSpanishWord = replaceWhiteSpace(spanishWord);
    const fileName = `${word}-${formattedSpanishWord}`;

    // File creation and storage.
    const audio =  await createPollyAudio(spanishWord, kSpanishVoice);
    const fileUrl = await writeAudioStreamToS3(audio.AudioStream, fileName);

    // File location.
    const fileLocation = fileUrl.slice(58);
    const finalLocation = `${cdn}/${fileLocation}`;

    // Return data.
    return {
        code: kSuccessResponse,
        data: finalLocation,
        response: kMessageResponse,
    };
};

// Create AWS Polly Audio Stream.
const createPollyAudio = async (text, voiceId) => {

    // SSML text.
    const ssmlText = `<speak><prosody rate="85%">${text}</prosody></speak>`;
    
    // Configuation parameters.
    const params = {
        Engine: 'neural',
        TextType: 'ssml',
        Text: ssmlText,
        OutputFormat: 'mp3',
        VoiceId: voiceId
    };
    
    // Small check to prevent errors
    if (text.length > 1) {
        return polly
        .synthesizeSpeech(params)
        .promise()
        .then((response) => response)
        .catch((error) => error);

    } else {
        throw 'The text can not be empty';
    }
};

//Convert Audio Stream to MP3 file and upload to S3.
const writeAudioStreamToS3 = async (audioStream, filename) => {

    // Configuation parameters.
    const params = {
        Body: audioStream,
        Bucket: kBucketName,
        ContentType: 'audio/mp3',
        Key: `${filename}.mp3`,
    };
    
    return S3
    .upload(params)
    .promise()
    .then((data) => data.Location)
    .catch((err) => err);
};

// Replace White with the letter A.
const replaceWhiteSpace = (text) => {
    return text
    .trim()
    .replace(/ /g,"-");
};