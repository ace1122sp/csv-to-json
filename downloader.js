const https = require('https');

const fetchPage = (urlF, callback) => {
  https.get(urlF, response => {
    let buffer = '';
    response.on('data', chunk => {
      buffer += chunk;
    });
    response.on('end', () => {
      callback(null, buffer);
    });
  }).on('error', error => {
    console.error(`Got error: ${error.message}`);
    callback(error);
  });
}

module.exports = fetchPage;
