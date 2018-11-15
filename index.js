const axios = require('axios');
// Google
const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';
// const GOOGLE_API_KEY = 'AIzaSyBiEJRmcV7hSb6tmJ-4Lrplql-hMUBqPGA';
const GOOGLE_API_KEY = 'AIzaSyDS6EIVEw5I3sYByxfUBn2Cl-PYqgkohc0';
// const CX = '011097117787804654050:v3uyn-qoe08';
// const CX = '011097117787804654050:qdbws3plvrc';
const CX = '011097117787804654050:q3hzfzue9ce';

// News API
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = 'ab4bfafd849845ae8b1cd553121a229e';

const query = 'UNESCO calls Narendra Modi the best prime minister in the world';
const image = require('./imageText');
const fileName = 'aids-pic.png';

const translate = require('./translate');
const sentiment = require('./sentiment');

image.getImage(fileName).then(image => {
  const translatedText = translate.translateText(image).then(text => {
    // console.log(text);
    // console.log(`image sentiment: ${sentiment(text)}`);
    sentiment(text).then(result => console.log(`text:\n${image}\nsentiment:\n${result}\n`));
  });
});

// https://newsapi.org/v2/everything?q=unesco%20bengali&from=2018-10-14&sortBy=publishedAt&apiKey=ab4bfafd849845ae8b1cd553121a229e

// const queryNewsAPI = (query) => {
//   return axios.get(NEWS_API_URL, {
//     params: {
//       apiKey: NEWS_API_KEY,
//       // cx: CX,
//       q: query,
//       from: '2018-10-14',
//       sortBy: 'publishedAt'
//     }
//   })
//   .then(results => {
//     let listOfInfo = [];
//     results.data.articles.map(article => {
//       // console.log(article);
//       // console.log(`content ${article.content}`);
//       const info = {
//         source: article.source.name,
//         text: article.content
//       }
//       listOfInfo.push(info);
//     });
//     return listOfInfo;
//   })
//   .catch(err => console.log(err));
// }

const queryCustomAPI = async (query) => {
  return await axios.get(GOOGLE_API_URL, {
    params: {
      key: GOOGLE_API_KEY,
      cx: CX,
      q: query
    }
  })
  .then(results => {
    let listOfInfo = [];
    results.data.items.map(item => {
      // console.log(item);
      // const snippet = h2p(item.htmlSnippet);
      // console.log(`snippet ${snippet} \n`);
      // const info = {
      //   // source: item.
      //   text: item.snippet
      // }
      listOfInfo.push(item.snippet);
    });
    return listOfInfo;
  })
  .catch(err => console.log(err));
}

// queryCustomAPI(query).then(list => console.log(list));
queryCustomAPI(query).then(list => {
  list.map(source => {
    sentiment(source).then(result => {
      console.log(result + '\n');
    });
  })
});