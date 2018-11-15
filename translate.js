// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

const translateText = (text) => {

// Your Google Cloud Platform project ID
const projectId = 'newslabs-sentiment';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
// const text = 'Hello, world!';
// The target language
const target = 'en';

// Translates some text into Russian
return translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    // console.log(`Text: ${text}`);
    // console.log(`Translation: ${translation}`);
    return translation;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

module.exports = {
    translateText
}
