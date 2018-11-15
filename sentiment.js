const axios = require('axios');
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

module.exports = (text) => {
  // const data = axios.get(`https://p9mg9ovkej.execute-api.eu-west-1.amazonaws.com/prod?text=${encodeURIComponent(text)}`)
  // .then(response =>  {
  //     const data = response.data;
  //     return data;
  // })
  // .catch(error => {
  //     console.log(error);
  // });
  // return new Promise((resolve, reject) => {
  //     data ? resolve(data) : reject('no data');
  // });

// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
// const text = 'Your text to analyze, e.g. Hello, world!';

// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the document
return client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;
    // console.log(`Document sentiment:`);
    // console.log(`  Score: ${sentiment.score}`);
    // console.log(`  Magnitude: ${sentiment.magnitude}`);

    // const sentences = results[0].sentences;
    // sentences.forEach(sentence => {
    //   console.log(`Sentence: ${sentence.text.content}`);
    //   console.log(`  Score: ${sentence.sentiment.score}`);
    //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
    // });

    // return {
    //   sentiment: sentiment.score,
    //   magnitude: sentiment.magnitude
    // }
    return sentiment.score;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}