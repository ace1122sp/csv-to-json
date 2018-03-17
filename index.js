const https = require('https');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const convertToJson = require('./converter');

const downloadPageAndConvert = url => {
  console.log('downloading', url);
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

  const folderName = uuidv1();
  fs.mkdirSync(folderName);
  fetchPage(url, (error, data) => {
    if(error) return console.log(error);
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
    fs.writeFile(path.join(__dirname, folderName, 'customer-data.csv'), data, () => {
      let jsonObject = convertToJson(path.join(__dirname, folderName, 'customer-data.csv'), path.join(__dirname, folderName, 'customer-data.json'));
    });
    console.log('downloading is done in folder', folderName);
  });
}

downloadPageAndConvert(process.argv[2]);
