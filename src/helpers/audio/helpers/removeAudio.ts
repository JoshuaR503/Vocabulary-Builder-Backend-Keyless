// Required constants.
import { kRemoveAudioName } from "./constants";

// Required libraries.
import lambdaHelper from "../libs/http";

// Spanish Speech helper.
const removeAduio = async (fileName: string): Promise<string> => {

    // API endpoint URL.
    const url: string = `${kRemoveAudioName}?fileName=${fileName}`;

    // Make HTTP request and return response.
    return await lambdaHelper(url);
};

// Export function.
export {
    removeAduio
};