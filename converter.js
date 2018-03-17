const fs = require('csvtojson');
const path = require('path');
const csvtojson = require('csvtojson');

function convertToJson(path, filename) {
  let arr = [];
  csvtojson()
    .fromFile(path)
    .on('json', obj => {
      arr.push(obj);
    })
    .on('done', error => {
      fs.writeFile(filename, JSON.stringify(arr), () => {
        console.log('file transformed to JSON');
      });
    })
    .on('error', error => {
      console.error(error);
    });
}

module.exports = convertToJson;
