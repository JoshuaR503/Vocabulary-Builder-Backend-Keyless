const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const polly = new AWS.Polly();

exports.handler = async (event) => {
    
    // Get data
    const lang = event.lang;
    const cleanedEnglish = replaceWhiteSpace(event.en);
    const cdn = 'https://d25rf0p9nsb187.cloudfront.net';

    if (lang == 'es') {
        const file = replaceWhiteSpace(event.es);
        const cleanFileName = `${cleanedEnglish}-${file}`;
        
        const data =  await createPollyAudio(event.es, 'Lupe');
        const fileUrl = await writeAudioStreamToS3(data.AudioStream, cleanFileName);
        const fileLocation = fileUrl.slice(58);
        
        return {
            code: 'success',
            response: 'Audio file successfully created',
            data: `${cdn}/${fileLocation}`,
        };
        
    } else if (lang == 'en') {
        
        const data = await createPollyAudio(event.en, 'Matthew');
        const fileUrl = await writeAudioStreamToS3(data.AudioStream, cleanedEnglish);
        const fileLocation = fileUrl.slice(58);
        
        return {
            code: 'success',
            response: 'Audio successfully updated',
            data: `${cdn}/${fileLocation}`,
        };
        
    } else if (lang == 'all') {
        // Create cleaned file names
        const cleanedSpanish = replaceWhiteSpace(event.es);
        const fileNameSpanish = `${cleanedEnglish}-${cleanedSpanish}`;
        
        // Create Audio Streams
        const audioEnglish = await createPollyAudio(event.en, 'Matthew');
        const audioSpanish = await createPollyAudio(event.es, 'Lupe');
        
        // Upload Audio Files in S3 and get it's location
        const audioEnglishLocation = await writeAudioStreamToS3(audioEnglish.AudioStream, cleanedEnglish);
        const audioSpanishLocation = await writeAudioStreamToS3(audioSpanish.AudioStream, fileNameSpanish);
        
        return {
            response: 'Audio Files have been successfully saved',
            message: 'Audio files successfully saved in English and Spanish',
            code: 'success',
            en: audioEnglishLocation,
            es: audioSpanishLocation,
            cdn: 'https://d25rf0p9nsb187.cloudfront.net'
        };
    } else {
        return {
            response: 'You forgot something!',
            message: 'No audio file will be created until you select a lang.',
            code: 'error',
        };
    }
};

// ================================================================
// Create AWS Polly Audio Stream
// ================================================================
async function createPollyAudio(text, voiceId) {

    const params = {
        Engine: 'neural',
        TextType: 'ssml',
        Text:`<speak><prosody rate="85%">${text}</prosody></speak>`,
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
}

// ================================================================
// Convert Audio Stream to MP3 and upload to S3
// ================================================================
function writeAudioStreamToS3(audioStream, filename) {
    const params = {
        Bucket: 'vocabulary-builder-sounds-bucket',
        Body: audioStream,
        Key: `${filename}.mp3`,
        ContentType: 'audio/mp3',
    };
    
    return S3
    .upload(params)
    .promise()
    .then((data) => data.Location)
    .catch((err) => err);
}

// ================================================================
// Replace White with a -
// ================================================================
function replaceWhiteSpace(text) {
    
    const cleanedInput = text
    .trim()
    .replace(/ /g,"-");

    return cleanedInput;
}