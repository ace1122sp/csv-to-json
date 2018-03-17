const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const convertToJson = require('./converter');
const download = require('./downloader');

const downloadPageAndConvert = url => {
  console.log('downloading', url);
  const folderName = uuidv1();
  fs.mkdirSync(folderName);

  download(url, (error, data) => {
    if(error) return console.error(error);
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
    fs.writeFile(path.join(__dirname, folderName, 'customer-data.csv'), data, () => {
      let jsonObject = convertToJson(path.join(__dirname, folderName, 'customer-data.csv'), path.join(__dirname, folderName, 'customer-data.json'));
    });
    console.log('downloading is done in folder', folderName);
  });
}

downloadPageAndConvert(process.argv[2]);
