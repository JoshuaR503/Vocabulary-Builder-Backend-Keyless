import { Translate } from 'aws-sdk';

const translate = new Translate();

// Translation service.
const translationService = async (text?: string) => {

  if (!text || text === null) {
    return;
  }

  // Configuarion parameters.
  const params = {
    Text: text,               /* required */
    SourceLanguageCode: 'en', /* required */
    TargetLanguageCode: 'es', /* required */
  }

  // Return AWS response.
  return await translate
  .translateText(params)
  .promise()
  .then((data) => data.TranslatedText)
  .catch((error) => error.message);
}

// Export function 
export default translationService;
