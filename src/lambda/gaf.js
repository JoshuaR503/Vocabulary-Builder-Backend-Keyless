// Required packages.
const AWS = require('aws-sdk');

// Services needed.
const S3 = new AWS.S3();
const polly = new AWS.Polly();

// Voices ids.
const kEnglishVoce = 'Joanna';
const kSpanishVoice = 'Lupe';

// Language codes.
const kEnglishLangCode = 'en';
const kSpanishLangCode = 'es';

// Hardcoded messages.
const kSuccessCode = 'success';
const kMessageFailure = 'Invalid data.';
const kMessageResponse = 'Data successfully saved.';

// S3 storage bucket name.
const kBucketName = 'vocabulary-builder-sounds-bucket';

// AWS Handler.
exports.handler = async (event) => {
    
    // Language code.
    const lang = event.lang;

    // Parent word.
    const parent = event.parentWord;

    // Small check to avoid errors.
    if (event.words.length < 1 || parent.length < 1) {
        throw kMessageFailure;
    }

    // Formatted data.
    const array = convertDataToArray(event.words);

    // Files' location.
    const fileData = await fileHandler(lang, parent, array);

    // Return data.
    return {
        code: kSuccessCode,
        message: fileData,
        response: kMessageResponse
    };
};

// Clean data and return in form of an array.
const convertDataToArray = (data) => {

    // Clean data by deleting any white space.
    const formattedData = data.replace(/\s*,\s*/g, ',');

    // Return formatted data in form of an array.
    return formattedData.split(',');
};

// Handle data.
const fileHandler = async (lang, parent, array) => {
    // Empty array that will hold file's location.
    let filesLocation = [];

    // Clean parent word.
    const parentWord = stringFormatHandler(parent);

    // Voice code based on lang code.
    const voiceId = voiceHandler(lang);

    // Create audio files for each word.
    for (let index = 0; index < array.length; index++) {

        // Clean single word from array.
        const word = stringFormatHandler(array[index]);

        // Create file name.
        const fileName = `${lang}-${parentWord}-${word}`;

        // Create audio.
        const audio = await createPollyAudio(word, voiceId);

        // Create aduio and store in S3.
        const location = await writeAudioStreamToS3(audio.AudioStream, fileName);

        // Add value to files variable.
        filesLocation.push(location);
    }

    // Return files variable.
    return filesLocation;
};

// String handler.
const stringFormatHandler = (string) => {
    return string
    .trim()
    .replace(/ /g,"-");
};

// Voice handler.
const voiceHandler = (lang) => {
    // Return voice code based on lang.
    switch (lang) {
        // If lang is English, then return an English voice.
        case kEnglishLangCode:
            return kEnglishVoce;

        // If lang is Spanish, then return an Spanish voice.
        case kSpanishLangCode:
            return kSpanishVoice;

        // Return error message.
        default:
            throw kMessageFailure;
    }
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
const writeAudioStreamToS3 = async (audioStream, fileName) => {

    // Configuation parameters.
    const params = {
        Body: audioStream,
        Bucket: kBucketName,
        ContentType: 'audio/mp3',
        Key: `${fileName}.mp3`,
    };
    
    return S3
    .upload(params)
    .promise()
    .then((data) => data.Location)
    .catch((err) => err);
};
