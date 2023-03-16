const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const polly = new AWS.Polly();

exports.handler = async (event) => {


    // Small Check to avoid erros
    if (event.words.length < 1 || event.parentWord.length < 1) {
        return {
            response: 'You forgot something',
            message: 'Please make sure to add words.',
            code: 'warning'
        };
    }
    
    // Get data
    const lang = event.lang;
    const parent = event.parentWord;
    
    const words = await deleteWhiteSpace(event.words);
    const wordsArr = await convertToArr(words);
    const wordsFileLocations = await createAudioStreams(lang, parent, wordsArr);

    // Return data
    return {
        response: 'Data successfully saved',
        message: 'Audio Files have been successfully created: ' + wordsFileLocations,
        code: 'success',
        wordsFileLocations
    };
};

// ================================================================
// Create AWS Polly Audio Stream
// ================================================================
async function createPollyAudio(text, voiceId) {
    
    // Configuation Params
    const params = {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: voiceId 
    };
    
    if (text.length > 1) {
        return polly
            .synthesizeSpeech(params)
            .promise()
            .then((response) => {
                return response;
            })
            .catch((error) => error);
    } else {
        throw 'The text can not be empty';
    }
}

// ================================================================
// Convert Audio Stream to MP3 and upload to S3
// ================================================================
async function writeAudioStreamToS3(audioStream, filename) {
    
    // Configuation Params
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
// Delete Whitespaces in front of strings
// ================================================================
function deleteWhiteSpace(text) {
    return text.replace(/\s*,\s*/g, ',');
}

// ================================================================
// Convert Strings into Arrays
// ================================================================
function convertToArr(text) {
    return text.split(",");
}

// ================================================================
// Replace white spaces in strings
// ================================================================
function replaceWhiteSpace(text) {
    return text.replace(/ /g,"-");
}

// ================================================================
// Create Audio files from Audio Streams and store in S3
// ================================================================
async function createAudioStreams(lang, parent, arr) {
    
    // Save file locations
    let fileLocations = [];
    
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i].trim();
    
        const cleanElement = replaceWhiteSpace(element);
        
        const parentClean = parent.trim();
        const cleanParent = replaceWhiteSpace(parentClean);
        
        const fileName = `${lang}-${cleanParent}-${cleanElement}`;
        const voice = lang == 'en' 
        ? 'Joanna'
        : 'Miguel';
            
        const audio = await createPollyAudio(element, voice);
        const fileLocation = await writeAudioStreamToS3(audio.AudioStream, fileName);
        
        fileLocations.push(fileLocation);
    }
    
    return fileLocations;
}