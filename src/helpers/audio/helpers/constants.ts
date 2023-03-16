// Import AWS Keys.
import { AWS_KEY, AWS_URL_SERVICE } from '../../../utils';

// URL from API.
const kAudioUrlService: string = AWS_URL_SERVICE;

// Required headers.
const kAudioUrlHeaders: object = {
   'Content-Type': 'application/json',
   'x-api-key': AWS_KEY,
}

// Function names.
const kRemoveAudioName: string = `${kAudioUrlService}CelestiaDeleteAudio`;
const kSpeechMultipleAduioName: string = `${kAudioUrlService}GenesisAudioFiles`;
const kSpeechFunctionGeneratorName: string = `${kAudioUrlService}CelestiaSingleAudioGenerator`;

// Export variables.
export {
    kAudioUrlHeaders,
    kRemoveAudioName,
    kSpeechMultipleAduioName,
    kSpeechFunctionGeneratorName
};
