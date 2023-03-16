import axios from 'axios';
import { kAudioUrlHeaders } from '../helpers/constants';

// HTTP helper.
const lambdaHelper = async (url: string, data?: object): Promise<string> => {

    // Make HTTP request and return a response.
    return axios
    .post(url, data, {headers: kAudioUrlHeaders})
    .then((response) => response.data.data)
    .catch((error) => `There was an unknown error: ${error}`);
}

// Export function.
export default lambdaHelper;